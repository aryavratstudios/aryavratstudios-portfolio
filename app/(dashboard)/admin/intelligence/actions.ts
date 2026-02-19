"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { extractMetadataFromScreenshot } from "@/lib/ai/ai-extraction";
import { requireAdmin } from "@/lib/admin-auth";
import { checkRateLimit } from "@/lib/rate-limit";

export async function processScreenshotAction(projectId: string, imageUrl: string) {
    // Verify admin authorization
    const { user } = await requireAdmin();
    
    // Rate limiting for admin actions
    const rateCheck = checkRateLimit(user.id, "admin");
    if (!rateCheck.allowed) {
        throw new Error("Too many admin actions. Please wait.");
    }
    
    const supabase = await createClient();

    // Trigger AI Extraction
    const extractedData = await extractMetadataFromScreenshot(imageUrl);

    // 3. Save Screenshot Record
    const { data: screenshot, error: screenshotError } = await supabase.from("screenshots").insert({
        project_id: projectId,
        storage_path: imageUrl, // Temporary mapping until storage is implemented
        public_url: imageUrl,
        screenshot_type: extractedData.screenshot_type,
        extracted_data: extractedData,
        ocr_text: JSON.stringify(extractedData), // Storing JSON as text for now
    }).select().single();

    if (screenshotError) throw screenshotError;

    // 4. Create Timeline Events
    if (extractedData.events && extractedData.events.length > 0) {
        const events = extractedData.events.map(event => ({
            project_id: projectId,
            screenshot_id: screenshot.id,
            event_type: event.type,
            event_date: event.date || new Date().toISOString(),
            summary: event.summary,
        }));
        await supabase.from("extracted_events").insert(events);
    }

    // 5. Create Tasks
    if (extractedData.tasks && extractedData.tasks.length > 0) {
        const tasks = extractedData.tasks.map(task => ({
            project_id: projectId,
            screenshot_id: screenshot.id,
            title: task.title,
            description: task.description,
            due_date: task.due_date,
            status: 'pending',
        }));
        await supabase.from("tasks").insert(tasks);
    }

    // 6. Update Project Fields if found
    const projectUpdates: any = {};
    if (extractedData.amount) projectUpdates.price = extractedData.amount;
    if (extractedData.deadline) projectUpdates.deadline = extractedData.deadline;

    if (Object.keys(projectUpdates).length > 0) {
        await supabase.from("projects").update(projectUpdates).eq("id", projectId);
    }

    // 7. Handle Payments and Revisions
    if (extractedData.screenshot_type === 'payment_proof' && extractedData.amount) {
        await supabase.from("payments").insert({
            project_id: projectId,
            screenshot_id: screenshot.id,
            amount: extractedData.amount,
            currency: extractedData.currency || 'USD',
            payment_date: new Date().toISOString(),
            status: 'completed',
        });
    }

    if (extractedData.screenshot_type === 'revision_request' && extractedData.revisions) {
        await supabase.from("revisions").insert({
            project_id: projectId,
            screenshot_id: screenshot.id,
            round_number: extractedData.revisions.round || 1,
            requested_at: extractedData.revisions.requested_at || new Date().toISOString(),
            feedback: extractedData.revisions.feedback,
        });
    }

    revalidatePath("/admin");
    return { success: true, data: extractedData };
}

export async function syncToHqAction(projectId: string) {
    // Verify admin authorization
    const { user } = await requireAdmin();
    
    // Rate limiting for admin actions
    const rateCheck = checkRateLimit(user.id, "admin");
    if (!rateCheck.allowed) {
        throw new Error("Too many admin actions. Please wait.");
    }
    
    const supabase = await createClient();

    // Fetch project data and its intelligence relations
    const [
        { data: project },
        { data: events },
        { data: payments },
    ] = await Promise.all([
        supabase.from("projects").select("*, profiles(email)").eq("id", projectId).single(),
        supabase.from("extracted_events").select("*").eq("project_id", projectId),
        supabase.from("payments").select("*").eq("project_id", projectId),
    ]);

    if (!project) throw new Error("Project not found");

    const standardizedProject = {
        id: project.id,
        client: project.profiles?.email,
        title: project.title,
        price: project.price,
        events: events?.map(e => ({ type: e.event_type, summary: e.summary, date: e.event_date })),
        payments: payments?.map(p => ({ amount: p.amount, date: p.payment_date })),
        synced_at: new Date().toISOString()
    };

    // Store in sync logs
    await supabase.from("sync_logs").insert({
        project_id: projectId,
        status: 'synced',
        last_synced_at: new Date().toISOString(),
        standardized_json: standardizedProject
    });

    revalidatePath("/admin");
    return { success: true };
}
