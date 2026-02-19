"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { generatePortfolioDescription } from "@/lib/openai";

const ADMIN_EMAIL = "karn.abhinav00@gmail.com";
const ARTIST_EMAIL = "abhiiinav.pc@gmail.com";

import { logAdminAction } from "@/lib/logger";

// ... existing imports ...

export async function updateProjectStatus(formData: FormData) {
    // ... existing setup ...
    const { data: { user } } = await supabase.auth.getUser();
    // ... existing checks ...

    await supabase.from("projects").update(updates).eq("id", id);

    await logAdminAction("update_project_status", id, { status, updates }, { projectId: id });

    revalidatePath("/admin");
    revalidatePath("/dashboard");
    revalidatePath("/work");
}

export async function togglePortfolio(formData: FormData) {
    // ... setup ...
    const id = formData.get("id") as string;
    const currentStateStr = formData.get("currentState") as string;
    const show = currentStateStr === "true";
    const newState = !show;
    // ... checks ...

    await supabase.from("projects").update({ show_in_portfolio: newState }).eq("id", id);

    await logAdminAction("toggle_portfolio", id, { newState }, { projectId: id });

    revalidatePath("/admin");
    revalidatePath("/work");
}

export async function updateProfileRole(formData: FormData) {
    // ... setup ...
    const id = formData.get("id") as string;
    const role = formData.get("role") as string;
    // ... checks ...

    await supabase.from("profiles").update({ role }).eq("id", id);

    await logAdminAction("update_role", id, { role }, { userId: id });

    revalidatePath("/admin");
}

export async function createCoupon(formData: FormData) {
    // ... setup ...
    const code = formData.get("code") as string;
    const discount = parseInt(formData.get("discount") as string);
    // ... checks ...

    const { data } = await supabase.from("coupons").insert({ code: code.toUpperCase(), discount_percent: discount, active: true }).select().single();

    await logAdminAction("create_coupon", data?.id, { code, discount }, { couponId: data?.id });

    revalidatePath("/admin");
}

export async function createUser(formData: FormData): Promise<void> {
    // ... setup ...
    // ... checks ...

    // ... create user ...
    const { data: newUser, error: authError } = await supabase.auth.admin.createUser({
        // ...
    });

    if (authError) {
        console.error("Auth error:", authError);
        return;
    }

    // Update profile
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
    // ... setup ...
    const id = formData.get("id") as string;
    const price = Number(formData.get("price"));
    // ... checks ...

    await supabase.from("projects").update({ price, final_price: price }).eq("id", id);

    await logAdminAction("update_price", id, { price }, { projectId: id });

    revalidatePath("/admin");
}
