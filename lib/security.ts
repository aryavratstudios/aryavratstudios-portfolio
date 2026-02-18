import { createClient } from "@/lib/supabase/server";

export async function logActivity(action: string, resourceId?: string, metadata: any = {}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // In a real production app, we would capture IP from headers
    // For now we simulate or omit

    await supabase.from("audit_logs").insert({
        actor_id: user?.id,
        action,
        resource_id: resourceId,
        metadata
    });
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
