"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { generatePortfolioDescription } from "@/lib/openai";
import { requireAdmin } from "@/lib/admin-auth";
import { logAdminAction } from "@/lib/logger";
import { checkRateLimit } from "@/lib/rate-limit";

export async function updateProjectStatus(formData: FormData) {
    // Verify admin authorization
    const { user } = await requireAdmin();
    
    // Rate limiting for admin actions
    const rateCheck = checkRateLimit(user.id, "admin");
    if (!rateCheck.allowed) {
        throw new Error("Too many admin actions. Please wait.");
    }
    
    const supabase = await createClient();
    
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;
    
    if (!id || !status) {
        throw new Error("Missing required fields: id and status");
    }
    
    const updates: Record<string, string> = { status };
    
    // Auto-generate portfolio description when completing a project
    if (status === "completed") {
        const { data: project } = await supabase
            .from("projects")
            .select("title, description, service_type")
            .eq("id", id)
            .single();
            
        if (project) {
            try {
                const description = await generatePortfolioDescription(
                    project.title, 
                    project.service_type || "Digital Services",
                    project.description || ""
                );
                if (description) {
                    updates.portfolio_description = description;
                }
            } catch (e) {
                console.error("Failed to generate portfolio description:", e);
            }
        }
    }
    
    await supabase.from("projects").update(updates).eq("id", id);
    
    await logAdminAction("update_project_status", id, { status, updates }, { projectId: id });

    revalidatePath("/admin");
    revalidatePath("/dashboard");
    revalidatePath("/work");
}

export async function togglePortfolio(formData: FormData) {
    // Verify admin authorization
    await requireAdmin();
    const supabase = await createClient();
    
    const id = formData.get("id") as string;
    const currentStateStr = formData.get("currentState") as string;
    const show = currentStateStr === "true";
    const newState = !show;
    
    if (!id) {
        throw new Error("Missing project ID");
    }

    await supabase.from("projects").update({ show_in_portfolio: newState }).eq("id", id);

    await logAdminAction("toggle_portfolio", id, { newState }, { projectId: id });

    revalidatePath("/admin");
    revalidatePath("/work");
}

export async function updateProfileRole(formData: FormData) {
    // Verify admin authorization
    await requireAdmin();
    const supabase = await createClient();
    
    const id = formData.get("id") as string;
    const role = formData.get("role") as string;
    
    if (!id || !role) {
        throw new Error("Missing required fields: id and role");
    }
    
    // Validate role
    const validRoles = ["client", "admin", "designer", "manager"];
    if (!validRoles.includes(role)) {
        throw new Error(`Invalid role: ${role}. Must be one of: ${validRoles.join(", ")}`);
    }

    await supabase.from("profiles").update({ role }).eq("id", id);

    await logAdminAction("update_role", id, { role }, { userId: id });

    revalidatePath("/admin");
}

export async function createCoupon(formData: FormData) {
    // Verify admin authorization
    await requireAdmin();
    const supabase = await createClient();
    
    const code = formData.get("code") as string;
    const discount = parseInt(formData.get("discount") as string);
    
    if (!code || isNaN(discount)) {
        throw new Error("Missing required fields: code and discount");
    }
    
    if (discount <= 0 || discount > 100) {
        throw new Error("Discount must be between 1 and 100 percent");
    }

    const { data } = await supabase.from("coupons").insert({ code: code.toUpperCase(), discount_percent: discount, active: true }).select().single();

    await logAdminAction("create_coupon", data?.id, { code, discount }, { couponId: data?.id });

    revalidatePath("/admin");
}

export async function createUser(formData: FormData): Promise<void> {
    // Verify admin authorization
    await requireAdmin();
    const supabase = await createClient();
    
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const fullName = formData.get("fullName") as string;
    
    if (!email || !role) {
        throw new Error("Missing required fields: email and role");
    }
    
    // Validate role
    const validRoles = ["client", "admin", "designer", "manager"];
    if (!validRoles.includes(role)) {
        throw new Error(`Invalid role: ${role}. Must be one of: ${validRoles.join(", ")}`);
    }

    // Create user via admin API
    const { data: newUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { full_name: fullName }
    });

    if (authError) {
        console.error("Auth error:", authError);
        throw new Error(`Failed to create user: ${authError.message}`);
    }

    // Update profile with role
    if (newUser.user) {
        await supabase.from("profiles").update({
            role,
            full_name: fullName
        }).eq("id", newUser.user.id);

        await logAdminAction("create_user", newUser.user.id, { email, role, fullName }, { userId: newUser.user.id });
    }

    revalidatePath("/admin");
}

export async function updateProjectPrice(formData: FormData) {
    // Verify admin authorization
    await requireAdmin();
    const supabase = await createClient();
    
    const id = formData.get("id") as string;
    const price = Number(formData.get("price"));
    
    if (!id || isNaN(price)) {
        throw new Error("Missing required fields: id and price");
    }
    
    if (price < 0) {
        throw new Error("Price cannot be negative");
    }

    await supabase.from("projects").update({ price, final_price: price }).eq("id", id);

    await logAdminAction("update_price", id, { price }, { projectId: id });

    revalidatePath("/admin");
}
