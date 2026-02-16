"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProjectStatus(formData: FormData) {
    const supabase = await createClient();
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") return;

    await supabase.from("projects").update({ status }).eq("id", id);
    revalidatePath("/admin");
    revalidatePath("/dashboard");
}

export async function togglePortfolio(formData: FormData) {
    const supabase = await createClient();
    const id = formData.get("id") as string;
    const currentStateStr = formData.get("currentState") as string;
    const show = currentStateStr === "true";
    const newState = !show;

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") return;

    await supabase.from("projects").update({ show_in_portfolio: newState }).eq("id", id);
    revalidatePath("/admin");
    revalidatePath("/work");
}
