import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Shield, Brain, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProjectIntelligenceDetails } from "@/components/admin/intelligence/project-intelligence-details";

export default async function ProjectIntelligencePage({
    params,
    searchParams
}: {
    params: { projectId?: string },
    searchParams: { q?: string }
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (!profile || profile.role !== "admin") redirect("/dashboard");

    // Fetch all projects for the sidebar
    const { data: allProjects } = await supabase
        .from("projects")
        .select("id, title, status, profiles(full_name)")
        .order("created_at", { ascending: false });

    const selectedProjectId = (await params).projectId;

    let selectedProjectData = null;
    let events = [];
    let payments = [];
    let tasks = [];
    let screenshots = [];

    if (selectedProjectId) {
        const [
            { data: project },
            { data: evs },
            { data: pays },
            { data: tsks },
            { data: scs }
        ] = await Promise.all([
            supabase.from("projects").select("*, profiles(full_name, email)").eq("id", selectedProjectId).single(),
            supabase.from("extracted_events").select("*").eq("project_id", selectedProjectId).order("event_date", { ascending: false }),
            supabase.from("payments").select("*").eq("project_id", selectedProjectId).order("payment_date", { ascending: false }),
            supabase.from("tasks").select("*").eq("project_id", selectedProjectId).order("created_at", { ascending: false }),
            supabase.from("screenshots").select("*").eq("project_id", selectedProjectId).order("created_at", { ascending: false }),
        ]);

        selectedProjectData = project;
        events = evs || [];
        payments = pays || [];
        tasks = tsks || [];
        screenshots = scs || [];
    }

    return (
        <div className="min-h-screen bg-black text-white font-inter">
            {/* Header */}
            <header className="p-8 pb-4 flex items-center justify-between border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <Brain className="w-8 h-8 text-primary" />
                            <h1 className="text-3xl font-black uppercase tracking-tighter">Neural Command</h1>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] mt-1">Project Intelligence Interface</p>
                    </div>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
                {/* Sidebar */}
                <aside className="w-full lg:w-96 border-r border-white/5 p-8 space-y-8 bg-zinc-950/20">
                    <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                        <input
                            placeholder="SEARCH NEURAL NET..."
                            className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-14 text-[10px] font-black uppercase tracking-widest text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.25em] px-2 text-right">Active Stream</h3>
                        <div className="space-y-3">
                            {allProjects?.map(project => (
                                <Link
                                    key={project.id}
                                    href={`/admin/intelligence/${project.id}`}
                                    className={cn(
                                        "block p-6 rounded-[2rem] border transition-all hover:scale-[1.02]",
                                        selectedProjectId === project.id
                                            ? "bg-white text-black border-white shadow-glow-primary"
                                            : "bg-zinc-900/40 border-white/5 text-white hover:bg-zinc-800"
                                    )}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={cn(
                                            "text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md border",
                                            selectedProjectId === project.id ? "border-black/20" : "border-white/10 bg-black/20"
                                        )}>
                                            {project.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-black truncate">{project.title}</h4>
                                    <p className={cn(
                                        "text-[9px] font-bold uppercase mt-1",
                                        selectedProjectId === project.id ? "text-black/60" : "text-zinc-500"
                                    )}>{(project.profiles as any)?.full_name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 lg:p-12 bg-black/40">
                    {selectedProjectData ? (
                        <ProjectIntelligenceDetails
                            project={selectedProjectData}
                            events={events}
                            payments={payments}
                            tasks={tasks}
                            screenshots={screenshots}
                        />
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-pulse">
                            <div className="h-24 w-24 bg-zinc-900 rounded-[2.5rem] flex items-center justify-center border border-white/5 shadow-inner">
                                <Brain className="w-10 h-10 text-zinc-700" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-white uppercase tracking-tighter">Awaiting Signal</h2>
                                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-2">Select a project to boot neural interface.</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
