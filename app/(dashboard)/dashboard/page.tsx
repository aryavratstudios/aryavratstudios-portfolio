"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Users,
    TrendingUp,
    ArrowUpRight,
    Package,
    Clock,
    CheckCircle2,
    CircleEllipsis,
    ArrowRight,
    Plus,
    Search,
    ChevronRight,
    MoreHorizontal
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Counter } from "@/components/counter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase
                    .from("projects")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });
                setProjects(data || []);
            }
            setLoading(false);
        };
        fetchProjects();
    }, []);

    const activeCount = projects?.filter(p => p.status === 'in_progress' || p.status === 'revision').length || 0;
    const completedCount = projects?.filter(p => p.status === 'completed' || p.status === 'delivered').length || 0;
    const totalSpent = projects?.reduce((acc, p) => acc + (p.price || 0), 0) || 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-10 pb-12">
            {/* Top Stat row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Sales / Spent Widget */}
                <div className="h-64 relative bg-stone-900/40 rounded-3xl border border-stone-800 p-8 flex flex-col justify-between overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10" />
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <span className="text-white/30 text-xs font-bold uppercase tracking-widest leading-6">Inventory Value</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-white text-4xl font-bold tracking-tighter">
                                    <Counter value={totalSpent} prefix="$" />
                                </span>
                                <div className="flex items-center text-lime-500 text-xs font-bold leading-5">
                                    <ArrowUpRight className="w-4 h-4" /> 15%
                                </div>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-stone-950 rounded-2xl flex items-center justify-center border border-stone-800 shadow-xl">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    {/* Visual Chart Placeholder */}
                    <div className="flex items-end gap-1.5 h-16 pt-2">
                        {[40, 60, 45, 90, 65, 80, 50, 70, 85, 60, 75, 55].map((h, i) => (
                            <div key={i} className="flex-1 bg-white/10 rounded-t-sm transition-all group-hover:bg-primary/20" style={{ height: `${h}%` }} />
                        ))}
                    </div>
                </div>

                {/* Active Projects Widget */}
                <div className="h-64 relative bg-stone-900/40 rounded-3xl border border-stone-800 p-8 flex flex-col justify-between overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -z-10" />
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <span className="text-white/30 text-xs font-bold uppercase tracking-widest leading-6">Active Jobs</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-white text-4xl font-bold tracking-tighter">
                                    <Counter value={activeCount} />
                                </span>
                                <div className="flex items-center text-emerald-500 text-xs font-bold leading-5">
                                    <ArrowUpRight className="w-4 h-4" /> 8%
                                </div>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-stone-950 rounded-2xl flex items-center justify-center border border-stone-800 shadow-xl">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-stone-900 bg-stone-800 overflow-hidden">
                                    <img src={`https://placehold.co/32x32?text=${i}`} alt="user" />
                                </div>
                            ))}
                        </div>
                        <span className="text-white/40 text-xs font-medium">Joined +12 people today</span>
                    </div>
                </div>

                {/* Profile Summary Card */}
                <div className="h-64 relative bg-stone-900/40 rounded-3xl border border-stone-800 p-8 flex flex-col items-center justify-center gap-4 text-center overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent -z-10" />
                    <div className="relative">
                        <img className="w-20 h-20 rounded-full border-4 border-stone-950 shadow-2xl" src="https://placehold.co/80x80" alt="Andrew Smith" />
                        <div className="absolute -bottom-1 -right-1 flex gap-0.5">
                            <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-stone-900" />
                            <div className="w-3 h-3 bg-amber-400 rounded-full border-2 border-stone-900" />
                            <div className="w-3 h-3 bg-lime-600 rounded-full border-2 border-stone-900" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-bold">Andrew Smith</h3>
                        <p className="text-white/40 text-xs uppercase font-bold tracking-[0.2em] mt-1">Product Designer</p>
                    </div>
                </div>
            </div>

            {/* Main Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Projects List / Table Section */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-white text-xl font-bold tracking-tight">Recent Projects</h2>
                        <div className="flex items-center gap-4">
                            <div className="relative hidden sm:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input type="text" placeholder="Search orders..." className="bg-stone-900/50 border border-stone-800 rounded-xl px-10 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all" />
                            </div>
                            <Button asChild size="sm" className="bg-white/5 border border-stone-800 text-white hover:bg-white/10 rounded-xl px-4">
                                <Link href="/dashboard/orders">View All</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="bg-stone-900/40 rounded-3xl border border-stone-800 backdrop-blur-3xl overflow-hidden">
                        <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-stone-800">
                                    <thead>
                                        <tr className="bg-stone-950/20">
                                            <th className="px-6 py-4 text-left text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Project</th>
                                            <th className="px-6 py-4 text-left text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Service</th>
                                            <th className="px-6 py-4 text-left text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Status</th>
                                            <th className="px-6 py-4 text-left text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Date</th>
                                            <th className="px-6 py-4 text-right text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-800">
                                        {projects.length > 0 ? (
                                            projects.slice(0, 5).map((project) => (
                                                <tr key={project.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => window.location.href = `/dashboard/orders/${project.id}`}>
                                                    <td className="px-6 py-5 whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center group-hover:bg-stone-900 transition-colors">
                                                                <Package className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                                                            </div>
                                                            <span className="text-white text-sm font-medium">{project.title}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 whitespace-nowrap text-white/40 text-sm">{project.service_type}</td>
                                                    <td className="px-6 py-5 whitespace-nowrap">
                                                        <span className={cn(
                                                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5",
                                                            project.status === 'delivered' || project.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' :
                                                                project.status === 'in_progress' ? 'bg-blue-500/10 text-blue-500' :
                                                                    project.status === 'revision' ? 'bg-orange-500/10 text-orange-500' :
                                                                        'bg-white/10 text-white/40'
                                                        )}>
                                                            <div className={cn("w-1 h-1 rounded-full",
                                                                project.status === 'delivered' || project.status === 'completed' ? 'bg-emerald-500' :
                                                                    project.status === 'in_progress' ? 'bg-blue-500' :
                                                                        project.status === 'revision' ? 'bg-orange-500' :
                                                                            'bg-white/40'
                                                            )} />
                                                            {project.status.replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 whitespace-nowrap text-white/30 text-[10px] font-bold uppercase tracking-wider">
                                                        {new Date(project.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-5 whitespace-nowrap text-right text-white text-sm font-bold">
                                                        ${project.price}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-20 text-center text-white/20 text-sm font-medium">No projects found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Widget Section */}
                <div className="lg:col-span-4 flex flex-col gap-10">
                    {/* Planned Income Chart Widget */}
                    <div className="bg-stone-900/40 rounded-3xl border border-stone-800 p-8 flex flex-col gap-6 relative overflow-hidden">
                        <div className="flex justify-between items-center">
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest leading-6">Growth Pulse</h3>
                            <MoreHorizontal className="w-5 h-5 text-white/20" />
                        </div>
                        <div className="relative flex justify-center items-center py-4">
                            {/* Circular Progress Visual */}
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-stone-800" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * 0.45)} className="text-primary drop-shadow-[0_0_8px_rgba(94,129,244,0.5)]" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-white text-3xl font-bold tracking-tighter">45%</span>
                                <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Target</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-stone-950/40 rounded-2xl border border-stone-800">
                                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Efficiency</div>
                                <div className="text-white text-lg font-bold">15%</div>
                            </div>
                            <div className="p-4 bg-stone-950/40 rounded-2xl border border-stone-800">
                                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Capacity</div>
                                <div className="text-white text-lg font-bold">75%</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access List */}
                    <div className="flex flex-col gap-4">
                        <div className="px-2 flex items-center justify-between">
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest">Innovation Lab</h3>
                            <Plus className="w-4 h-4 text-white/40 cursor-pointer hover:text-white transition-colors" />
                        </div>
                        <div className="space-y-3">
                            {[
                                { title: "New Concept", sub: "Brand identity refresh", icon: ArrowRight, color: "text-blue-500" },
                                { title: "Review Pack", sub: "Deliverable internal check", icon: ArrowRight, color: "text-orange-500" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-stone-900/40 rounded-2xl border border-stone-800 hover:bg-white/[0.04] transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("w-10 h-10 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center", item.color)}>
                                            <item.icon className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-bold">{item.title}</div>
                                            <div className="text-white/30 text-[10px] font-medium leading-4">{item.sub}</div>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/40 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
