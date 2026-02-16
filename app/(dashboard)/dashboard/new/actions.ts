"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createDiscordTicket } from "@/lib/discord";

export async function createOrder(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Ensure profile exists (Safety check for FK container)
    const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

    if (!profile) {
        await supabase.from("profiles").insert({
            id: user.id,
            email: user.email!,
            role: "client"
        });
    }

    const title = formData.get("title") as string;
    const service_type = formData.get("service") as string;
    const description = formData.get("description") as string;

    const { error } = await supabase.from("projects").insert({
        user_id: user.id,
        title,
        service_type,
        description,
        status: "pending_review",
    });

    if (error) {
        console.error("Error creating order:", error);
        redirect("/dashboard/new?error=Failed to create order");
    }

    // Fetch the inserted project ID
    const { data: newProject } = await supabase
        .from("projects")
        .select("id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    revalidatePath("/dashboard");

    if (newProject) {
        redirect(`/dashboard/checkout/${newProject.id}`);
    }

    redirect("/dashboard/orders");
}
