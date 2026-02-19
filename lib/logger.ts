import { createClient } from "@/lib/supabase/server";

export async function logAdminAction(
    action: string,
    targetId: string | null,
    details: any,
    metadata: any = {}
) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return;

        await supabase.from("audit_logs").insert({
            admin_id: user.id,
            action,
            target_id: targetId,
            details,
            metadata,
            ip_address: "unknown", // Server actions don't easily give IP without headers pass-through
            created_at: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Failed to log admin action:", error);
        // Don't fail the action if logging fails
    }
}
