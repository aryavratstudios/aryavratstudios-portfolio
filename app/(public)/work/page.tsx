import { createClient } from "@/lib/supabase/server";
import { ExternalLink, LayoutGrid, Globe, Video, Palette } from "lucide-react";
import ProjectGrid from "@/components/project-grid";

// revalidate every hour
export const revalidate = 3600;

export default async function WorkPage() {
    const supabase = await createClient();

    const { data: projects } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "completed")
        .eq("show_in_portfolio", true)
        .order("created_at", { ascending: false });

    return (
        <div className="py-24 md:py-32 bg-black min-h-screen relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-20 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                        <Palette className="w-4 h-4" />
                        Our Portfolio
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">The <span className="text-primary">Masterpieces</span></h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Explore our curated selection of high-impact digital projects. Every project tells a story of innovation and craftsmanship.
                    </p>
                </div>

                {(!projects || projects.length === 0) ? (
                    <div className="text-center py-32 rounded-[2rem] border border-white/5 bg-white/5 backdrop-blur-sm">
                        <LayoutGrid className="w-16 h-16 text-zinc-600 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-2">Portfolio is evolving</h3>
                        <p className="text-zinc-500">We are currently curating new spectacular projects. Check back soon.</p>
                    </div>
                ) : (
                    <ProjectGrid projects={projects} />
                )}
            </div>
        </div>
    );
}
