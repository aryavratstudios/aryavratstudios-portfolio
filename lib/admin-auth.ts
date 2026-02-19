import { createClient } from "@/lib/supabase/server";

/**
 * Verify that the current user is an admin
 * Returns the user if admin, throws error otherwise
 */
export async function requireAdmin() {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("Unauthorized: Authentication required");
    }

    // Check if user has admin role
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role, email")
        .eq("id", user.id)
        .single();

    if (profileError || !profile) {
        throw new Error("Unauthorized: Profile not found");
    }

    if (profile.role !== "admin") {
        throw new Error(`Forbidden: Admin access required. Current role: ${profile.role}`);
    }

    return { user, profile };
}

/**
 * Check if a user is an admin (non-throwing)
 */
export async function isAdmin(userId?: string): Promise<boolean> {
    const supabase = await createClient();
    
    let targetUserId = userId;
    
    if (!targetUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        targetUserId = user?.id;
    }
    
    if (!targetUserId) return false;
    
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", targetUserId)
        .single();
    
    return profile?.role === "admin";
}
