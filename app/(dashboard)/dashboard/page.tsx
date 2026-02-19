"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Clock, CheckCircle, Package, ArrowRight, TrendingUp, Zap, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Counter } from "@/components/counter";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

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
    }, [supabase]);

    const activeProjects = projects?.filter(p => p.status === 'in_progress' || p.status === 'revision') || [];
    const pendingProjects = projects?.filter(p => p.status === 'pending_review') || [];
    const completedProjects = projects?.filter(p => p.status === 'completed' || p.status === 'delivered') || [];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
                    <p className="text-zinc-400 text-sm">Here's an overview of your active creative projects.</p>
                </div>
                <Button asChild className="rounded-full h-11 px-7 font-semibold shadow-glow-primary hover:scale-105 transition-all bg-primary text-black border-none">
                    <Link href="/dashboard/new">
                        <PlusCircle className="mr-2 h-5 w-5" />
                        START NEW PROJECT
                    </Link>
                </Button>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { title: "In Production", count: activeProjects.length, icon: Zap, sub: "Currently being crafted", color: "text-secondary", bg: "bg-secondary/10" },
                    { title: "Review Required", count: pendingProjects.length, icon: Sparkles, sub: "Waiting for your feedback", color: "text-primary", bg: "bg-primary/10" },
                    { title: "Completed", count: completedProjects.length, icon: CheckCircle, sub: "Successfully delivered", color: "text-accent", bg: "bg-accent/10" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="glass-card border-foreground/5 bg-foreground/[0.02] hover:border-primary/30 hover:bg-foreground/[0.04] transition-all duration-500 group">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-primary transition-colors">{stat.title}</CardTitle>
                                <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-12", stat.bg)}>
                                    <stat.icon className={cn("h-4 w-4", stat.color)} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-5xl font-black text-foreground mb-1 tracking-tighter">
                                    <Counter value={stat.count} />
                                </div>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{stat.sub}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2 glass-card border-white/5 bg-zinc-900/20">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold">Recent Projects</CardTitle>
                            <CardDescription className="text-zinc-500">Your latest project activity</CardDescription>
                        </div>
                        <Button variant="ghost" asChild className="text-primary hover:text-primary hover:bg-primary/10">
                            <Link href="/dashboard/orders">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {projects.length > 0 ? (
                            <div className="space-y-4">
                                {projects.slice(0, 4).map((project, i) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={`/dashboard/orders/${project.id}`}
                                            className="flex items-center justify-between p-5 rounded-[1.5rem] bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                                                    <Package className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white mb-0.5">{project.title}</div>
                                                    <div className="text-xs text-zinc-500 uppercase font-bold tracking-tight">{project.service_type}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {project.status === 'pending_review' && (
                                                    <Button size="sm" asChild className="h-8 rounded-full bg-primary/20 text-primary border border-primary/20 hover:bg-primary text-[10px] font-black uppercase tracking-widest hover:text-black transition-all">
                                                        <span onClick={(e) => e.stopPropagation()}>
                                                            <Link href={`/dashboard/checkout/${project.id}`}>Complete Payment</Link>
                                                        </span>
                                                    </Button>
                                                )}
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest
                                                    ${project.status === 'delivered' ? 'bg-accent/10 text-accent border border-accent/20' :
                                                        project.status === 'revision' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                                                            project.status === 'completed' ? 'bg-accent/10 text-accent border border-accent/20' :
                                                                project.status === 'payment_done' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                                                                    project.status === 'in_progress' ? 'bg-primary/10 text-primary border border-primary/20' :
                                                                        'bg-zinc-800 text-zinc-400 border border-white/5'}`}>
                                                    {project.status.replace('_', ' ')}
                                                </span>
                                                <ChevronRight className="h-4 w-4 text-zinc-700 group-hover:text-white transition-colors" />
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                                <p className="text-zinc-500 mb-6">No active projects found.</p>
                                <Button asChild variant="outline" className="rounded-full border-white/10">
                                    <Link href="/dashboard/new">Place your first order</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="glass-card border-primary/20 bg-primary/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] -z-10"></div>
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Priority Workshop</CardTitle>
                        <CardDescription className="text-zinc-500">Accelerate your growth pipeline</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                            <h4 className="text-sm font-bold flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                Quick Start
                            </h4>
                            <p className="text-xs text-zinc-500 leading-relaxed">Need something specific? Browse our predefined service packages or request a quick consultation.</p>
                        </div>
                        <div className="grid gap-3">
                            <Button className="w-full justify-between rounded-xl h-11 border-white/10 hover:bg-white/10" variant="outline" asChild>
                                <Link href="/services">
                                    Browse Packages <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button className="w-full justify-between rounded-xl h-11 border-white/10 hover:bg-white/10" variant="outline" asChild>
                                <Link href="/work">
                                    Innovation Gallery <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function ChevronRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}
