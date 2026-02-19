"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { checkRateLimit } from "@/lib/rate-limit";

export async function addPortfolioItem(formData: FormData) {
    // Verify admin authorization
    const { user } = await requireAdmin();
    
    // Rate limiting for admin actions
    const rateCheck = checkRateLimit(user.id, "admin");
    if (!rateCheck.allowed) {
        throw new Error("Too many admin actions. Please wait.");
    }
    
    const supabase = await createClient();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const service_type = formData.get("service_type") as string;
    const image_url = formData.get("image_url") as string;
    const client_name = formData.get("client_name") as string;
    const project_url = formData.get("project_url") as string;

    const { error } = await supabase.from("portfolio").insert({
        title,
        description,
        service_type,
        image_url,
        client_name,
        project_url
    });

    if (error) {
        console.error("Error adding portfolio item:", error);
    }

    revalidatePath("/admin");
    revalidatePath("/work");
}

export async function deletePortfolioItem(formData: FormData) {
    // Verify admin authorization
    const { user } = await requireAdmin();
    
    // Rate limiting for admin actions
    const rateCheck = checkRateLimit(user.id, "admin");
    if (!rateCheck.allowed) {
        throw new Error("Too many admin actions. Please wait.");
    }
    
    const supabase = await createClient();
    const id = formData.get("id") as string;

    const { error } = await supabase.from("portfolio").delete().eq("id", id);

    if (error) {
        console.error("Error deleting portfolio item:", error);
    }

    revalidatePath("/admin");
    revalidatePath("/work");
}
