"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { createDiscordTicket } from "@/lib/discord";
import { validatePrice, getBasePrice } from "@/lib/pricing";
import { checkRateLimit } from "@/lib/rate-limit";

export async function validateCoupon(code: string) {
    // Rate limiting for coupon validation
    const rateLimitKey = code; // Use coupon code as part of the key
    const rateCheck = checkRateLimit(rateLimitKey, "coupon");
    if (!rateCheck.allowed) {
        return { success: false, message: "Too many validation attempts. Please wait." };
    }
    
    const supabase = await createClient();
    const { data: coupon, error } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", code.toUpperCase())
        .eq("active", true)
        .single();

    if (error || !coupon) {
        return { success: false, message: "Invalid or expired coupon" };
    }

    return {
        success: true,
        discountPercent: Number(coupon.discount_percent),
        id: coupon.id
    };
}

export async function completePayment(projectId: string, couponId?: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("Unauthorized");
    
    // Rate limiting for payments
    const rateCheck = checkRateLimit(user.id, "payment");
    if (!rateCheck.allowed) {
        throw new Error("Too many payment attempts. Please wait before trying again.");
    }

    // Safety check for profile (ensure FK doesn't fail)
    const { data: profile } = await supabase.from("profiles").select("id").eq("id", user.id).single();
    if (!profile) {
        await supabase.from("profiles").insert({ id: user.id, email: user.email!, role: "client" });
    }

    // Fetch project details
    const { data: project, error: fetchError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

    if (fetchError || !project) throw new Error("Project not found");

    // SECURITY: Validate price server-side to prevent tampering
    const priceValidation = validatePrice(project.service_type, Number(project.price) || 35);
    if (!priceValidation.valid) {
        throw new Error(priceValidation.message);
    }

    // Use base price as the authoritative price (not client-submitted)
    let finalPrice = priceValidation.basePrice;
    let discountAmount = 0;

    if (couponId) {
        const { data: coupon } = await supabase
            .from("coupons")
            .select("discount_percent")
            .eq("id", couponId)
            .single();

        if (coupon) {
            discountAmount = (finalPrice * Number(coupon.discount_percent)) / 100;
            finalPrice = finalPrice - discountAmount;
        }
    }

    // Update status and final pricing details
    const { error: updateError } = await supabase
        .from("projects")
        .update({
            status: "in_progress",
            discount_amount: discountAmount,
            final_price: finalPrice,
            coupon_id: couponId || null
        })
        .eq("id", projectId);

    if (updateError) throw new Error("Failed to update project status");

    // Create Discord Ticket
    const discordTicket = await createDiscordTicket(project.title, user.email || user.id);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/orders");

    return {
        success: true,
        ticketUrl: discordTicket?.url,
        inviteUrl: process.env.DISCORD_INVITE_URL || "https://discord.gg/aUZuXcZvYa"
    };
}
