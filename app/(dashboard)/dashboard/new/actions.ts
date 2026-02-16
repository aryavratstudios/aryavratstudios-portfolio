"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOrder(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
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
        // Ideally return error state
        redirect("/dashboard/new?error=Failed to create order");
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}
