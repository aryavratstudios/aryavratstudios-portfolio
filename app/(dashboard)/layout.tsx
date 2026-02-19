import { Sidebar } from "@/components/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { AiAssistant } from "@/components/ai-assistant";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isSuperAdmin } from "@/lib/admin-auth";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        redirect("/login");
    }

    // Authorization Check
    const isWhitelisted = isSuperAdmin(user.email);

    // Fetch profile to get role (fallback/synergy)
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    const role = profile?.role || 'client';
    const isAdmin = role === 'admin' || isWhitelisted;

    return (
        <div className="flex min-h-screen bg-black overflow-hidden selection:bg-primary selection:text-black">
            {isAdmin ? <AdminSidebar /> : <Sidebar role={role} />}
            <MobileNav role={role} />
            <main className="flex-1 overflow-y-auto relative custom-scrollbar pt-20 md:pt-0">
                {/* Ambient Background */}
                <div className="fixed inset-0 pointer-events-none -z-10">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-40"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] opacity-20"></div>
                </div>

                <div className="mx-auto max-w-7xl p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    {children}
                </div>
            </main>
            <AiAssistant />
        </div>
    );
}
