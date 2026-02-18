"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { generatePortfolioDescription } from "@/lib/openai";

const ADMIN_EMAIL = "karn.abhinav00@gmail.com";
const ARTIST_EMAIL = "abhiiinav.pc@gmail.com";

export async function updateProjectStatus(formData: FormData) {
    const supabase = await createClient();
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: adminProfile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (adminProfile?.role !== "admin") return;

    const { data: project } = await supabase
        .from("projects")
        .select("title, service_type, description")
        .eq("id", id)
        .single();

    const updates: any = { status };

    if (status === "completed" && project) {
        const aiDescription = await generatePortfolioDescription(
            project.title,
            project.service_type,
            project.description
        );

        updates.show_in_portfolio = true;
        updates.portfolio_description = aiDescription;
        updates.artist_email = ARTIST_EMAIL;
    }

    await supabase.from("projects").update(updates).eq("id", id);
    revalidatePath("/admin");
    revalidatePath("/dashboard");
    revalidatePath("/work");
}

export async function togglePortfolio(formData: FormData) {
    const supabase = await createClient();
    const id = formData.get("id") as string;
    const currentStateStr = formData.get("currentState") as string;
    const show = currentStateStr === "true";
    const newState = !show;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") return;

    await supabase.from("projects").update({ show_in_portfolio: newState }).eq("id", id);
    revalidatePath("/admin");
    revalidatePath("/work");
}

export async function updateProfileRole(formData: FormData) {
    const supabase = await createClient();
    const id = formData.get("id") as string;
    const role = formData.get("role") as string;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") return;

    await supabase.from("profiles").update({ role }).eq("id", id);
    revalidatePath("/admin");
}

export async function createCoupon(formData: FormData) {
    const supabase = await createClient();
    const code = formData.get("code") as string;
    const discount = parseInt(formData.get("discount") as string);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: adminProfile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (adminProfile?.role !== "admin") return;

    await supabase.from("coupons").insert({ code: code.toUpperCase(), discount_percent: discount, active: true });
    revalidatePath("/admin");
}

export async function createUser(formData: FormData): Promise<void> {
    const supabase = await createClient();
    const email = formData.get("email") as string;
    const fullName = formData.get("full_name") as string;
    const role = formData.get("role") as string;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: adminProfile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (adminProfile?.role !== "admin") return;

    // Create auth user with admin privileges
    const { data: newUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: {
            full_name: fullName
        }
    });

    if (authError) {
        console.error("Auth error:", authError);
        return;
    }

    // Update profile with role
    if (newUser.user) {
        await supabase.from("profiles").update({
            role,
            full_name: fullName
        }).eq("id", newUser.user.id);
    }

    revalidatePath("/admin");
}


export async function updateProjectPrice(formData: FormData) {
    const supabase = await createClient();
    const id = formData.get("id") as string;
    const price = Number(formData.get("price"));

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") return;

    await supabase.from("projects").update({ price, final_price: price }).eq("id", id);
    revalidatePath("/admin");
}
