"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { createDiscordTicket, createDiscordInvite } from "@/lib/discord";
import { validatePrice, getBasePrice } from "@/lib/pricing";
import { checkRateLimit } from "@/lib/rate-limit";
import { logActivity, generatePaymentToken } from "@/lib/security";

export async function validateCoupon(code: string) {
    // Rate limiting for coupon validation
    const rateLimitKey = code; // Use coupon code as part of the key
    const rateCheck = await checkRateLimit(rateLimitKey, "coupon");
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

export async function completePayment(projectId: string, couponId?: string, contractAccepted: boolean = false) {
    if (!contractAccepted) throw new Error("International Client Service Agreement must be accepted.");

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorized");

    // Rate limiting for payments
    const rateCheck = await checkRateLimit(user.id, "payment");
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
    // Always use base price as the authoritative price (never trust client-submitted project.price)
    const basePrice = getBasePrice(project.service_type);
    let finalPrice = basePrice;
    let discountAmount = 0;

    // Generate payment token for audit trail
    const paymentToken = generatePaymentToken();

    if (couponId) {
        const { data: coupon } = await supabase
            .from("coupons")
            .select("discount_percent")
            .eq("id", couponId)
            .eq("active", true) // Added safety check
            .single();

        if (coupon) {
            discountAmount = (finalPrice * Number(coupon.discount_percent)) / 100;
            finalPrice = finalPrice - discountAmount;
        }
    }

    // Ensure finalPrice is non-negative and matches expectations
    if (finalPrice < 0) finalPrice = 0;

    // Update status and final pricing details with payment token
    const { error: updateError } = await supabase
        .from("projects")
        .update({
            status: "in_progress",
            discount_amount: discountAmount,
            price: basePrice,      // Force correct base price
            final_price: finalPrice, // Set calculated final price
            coupon_id: couponId || null,
            payment_token: paymentToken,
            contract_accepted: true,
            contract_accepted_at: new Date().toISOString()
        })
        .eq("id", projectId);


    if (updateError) throw new Error("Failed to update project status");

    // Create audit trail for payment
    await logActivity({
        action: "payment_completed",
        resourceId: projectId,
        actorId: user.id,
        metadata: {
            amount: finalPrice,
            discountAmount,
            paymentToken,
            serviceType: project.service_type
        }
    });

    // Create Discord Ticket
    const discordTicket = await createDiscordTicket(project.title, user.email || user.id);

    // Generate Discord invite for client to join
    const discordInvite = await createDiscordInvite();

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/orders");

    return {
        success: true,
        ticketUrl: discordTicket?.url,
        inviteUrl: discordInvite || process.env.DISCORD_INVITE_URL || "https://discord.gg/aUZuXcZvYa"
    };
}
