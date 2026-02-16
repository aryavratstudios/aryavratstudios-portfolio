import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch profile to get role for sidebar
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    const role = profile?.role || 'client';

    return (
        <div className="flex min-h-screen bg-black overflow-hidden selection:bg-primary selection:text-black">
            <Sidebar role={role} />
            <MobileNav role={role} />
            <main className="flex-1 overflow-y-auto relative custom-scrollbar pt-20 md:pt-0">
                {/* Ambient Background */}
                <div className="fixed inset-0 pointer-events-none -z-10">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] opacity-30"></div>
                </div>

                <div className="mx-auto max-w-7xl p-8 md:p-12 animate-in fade-in duration-700">
                    {children}
                </div>
            </main>
        </div>
    );
}
