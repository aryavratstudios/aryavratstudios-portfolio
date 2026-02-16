import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProjectStatus, togglePortfolio } from "./actions";
import { Button } from "@/components/ui/button";
import { Shield, Eye, EyeOff, User, MoreVertical, Search, Filter } from "lucide-react";

export default async function AdminPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (!profile || profile.role !== "admin") {
        redirect("/dashboard");
    }

    const { data: projects } = await supabase
        .from("projects")
        .select("*, profiles(email, full_name, role)")
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-12 pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white">Admin Console</h1>
                    </div>
                    <p className="text-zinc-500">Manage all studio project pipelines and portfolio curations.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                        <input
                            placeholder="Search projects..."
                            className="h-11 w-64 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary focus:outline-none focus:bg-white/10 transition-all"
                        />
                    </div>
                    <Button variant="outline" className="h-11 rounded-xl border-white/10 bg-white/5 hover:bg-white/10">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </Button>
                </div>
            </div>

            <Card className="glass-card border-white/5 bg-zinc-900/20 overflow-hidden">
                <CardHeader className="p-8 border-b border-white/5">
                    <CardTitle className="text-xl font-bold">Studio Pipeline</CardTitle>
                    <CardDescription className="text-zinc-500">Live overview of active and legacy studio orders.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                                    <th className="px-8 py-5 border-b border-white/5">Client</th>
                                    <th className="px-8 py-5 border-b border-white/5">Project Objective</th>
                                    <th className="px-8 py-5 border-b border-white/5">Status</th>
                                    <th className="px-8 py-5 border-b border-white/5">Work Showcase</th>
                                    <th className="px-8 py-5 border-b border-white/5 text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {projects?.map((project) => (
                                    <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                                                    <User className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white text-sm">{project.profiles?.full_name || 'Anonymous Client'}</div>
                                                    <div className="text-zinc-500 text-xs">{project.profiles?.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 max-w-md">
                                            <div className="font-bold text-white text-sm group-hover:text-primary transition-colors">{project.title}</div>
                                            <div className="text-zinc-500 text-xs mt-1 uppercase font-bold tracking-tight">{project.service_type}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <form action={updateProjectStatus}>
                                                <input type="hidden" name="id" value={project.id} />
                                                <select
                                                    name="status"
                                                    defaultValue={project.status}
                                                    className="bg-zinc-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:ring-1 focus:ring-primary focus:outline-none hover:bg-zinc-900 transition-all cursor-pointer"
                                                    onChange={(e) => e.target.form?.requestSubmit()}
                                                >
                                                    <option value="pending_review">PENDING</option>
                                                    <option value="in_progress">IN PROGRESS</option>
                                                    <option value="delivered">DELIVERED</option>
                                                    <option value="revision">REVISION</option>
                                                    <option value="approved">APPROVED</option>
                                                    <option value="completed">COMPLETED</option>
                                                </select>
                                            </form>
                                        </td>
                                        <td className="px-8 py-6">
                                            <form action={togglePortfolio}>
                                                <input type="hidden" name="id" value={project.id} />
                                                <input type="hidden" name="currentState" value={String(project.show_in_portfolio)} />
                                                <button
                                                    type="submit"
                                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                                                        ${project.show_in_portfolio
                                                            ? 'bg-primary/20 text-primary border border-primary/20 hover:bg-primary/30'
                                                            : 'bg-zinc-800 text-zinc-500 border border-white/5 hover:bg-zinc-700 hover:text-white'}`}
                                                >
                                                    {project.show_in_portfolio ? (
                                                        <><Eye className="w-3 h-3" /> Featured</>
                                                    ) : (
                                                        <><EyeOff className="w-3 h-3" /> Private</>
                                                    )}
                                                </button>
                                            </form>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-white">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
