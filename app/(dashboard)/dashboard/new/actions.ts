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

    // Discord Integration
    const discordTicket = await createDiscordTicket(title, user.email || user.id);

    revalidatePath("/dashboard");

    // Redirect to success page with discord info
    const successUrl = new URL("/dashboard/new/success", "http://localhost:3000");
    if (discordTicket) {
        successUrl.searchParams.set("ticketUrl", discordTicket.url);
    }

    redirect(successUrl.pathname + successUrl.search);
}
