import { createClient } from "@/lib/supabase/server";

const ADMIN_WHITELIST = [
    "karn.abhinav00@gmail.com",
    "abhinavytagain666@gmail.com",
    "inkly412@gmail.com",
    "aryavrat.studios@gmail.com"
];

/**
 * Check if an email is in the admin whitelist
 */
export function isWhitelisted(email?: string): boolean {
    if (!email) return false;
    return ADMIN_WHITELIST.includes(email.toLowerCase());
}

/**
 * Verify that the current user is an admin and whitelisted
 * Returns the user if admin, throws error otherwise
 */
export async function requireAdmin() {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("Unauthorized: Authentication required");
    }

    // 1. Mandatory Whitelist Check
    if (!isWhitelisted(user.email)) {
        throw new Error(`Forbidden: Access restricted to authorized administrators only. (${user.email})`);
    }

    // 2. Database Role Check
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role, email")
        .eq("id", user.id)
        .single();

    if (profileError || !profile) {
        throw new Error("Unauthorized: Profile not found");
    }

    if (profile.role !== "admin") {
        throw new Error(`Forbidden: Admin role required in database. Current role: ${profile.role}`);
    }

    return { user, profile };
}

/**
 * Check if a user is an admin (non-throwing)
 */
export async function isAdmin(userId?: string): Promise<boolean> {
    const supabase = await createClient();

    let targetUserId = userId;
    let targetEmail: string | undefined;

    if (!targetUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        targetUserId = user?.id;
        targetEmail = user?.email;
    }

    if (!targetUserId) return false;

    // Check whitelist first if email is available
    if (targetEmail && !isWhitelisted(targetEmail)) {
        return false;
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role, email")
        .eq("id", targetUserId)
        .single();

    // Final verify against whitelist and role
    return profile?.role === "admin" && isWhitelisted(profile.email || targetEmail);
}

/**
 * Alias for isAdmin for backward compatibility
 */
export async function isSuperAdmin(email?: string): Promise<boolean> {
    if (email) {
        return isWhitelisted(email);
    }
    const { data: { user } } = await (await createClient()).auth.getUser();
    return isWhitelisted(user?.email);
}

