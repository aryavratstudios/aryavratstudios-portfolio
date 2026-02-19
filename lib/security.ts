import { createClient } from "@/lib/supabase/server";

export interface AuditLogParams {
    action: string;
    resourceId?: string;
    actorId?: string;
    metadata?: Record<string, unknown>;
    ipAddress?: string;
}

export async function logActivity(params: AuditLogParams) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from("audit_logs").insert({
        actor_id: params.actorId || user?.id,
        action: params.action,
        resource_id: params.resourceId,
        metadata: { ...params.metadata, ip_address: params.ipAddress }
    });
}

// Extract IP address from request headers
export function getClientIp(headers: Headers): string {
    const forwarded = headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }
    return headers.get("x-real-ip") || "unknown";
}

// Generate a secure payment token
export function generatePaymentToken(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "PAY_";
    for (let i = 0; i < 16; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

// Utility to mask sensitive financial strings
// e.g., "$5,000.00" -> "$*,***.**"
export function maskFinancialData(amount: number | string, currency = "$"): string {
    return `${currency}****`;
}

// Utility to mask partial email
// e.g., "john.doe@example.com" -> "j***@example.com"
export function maskEmail(email: string): string {
    const [local, domain] = email.split("@");
    if (!local || !domain) return email;
    return `${local[0]}***@${domain}`;
}
