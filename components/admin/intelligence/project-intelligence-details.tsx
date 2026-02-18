"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectTimeline } from "./project_timeline";
import { FinancialSummary } from "./financial-summary";
import { ScreenshotUploader } from "./screenshot-uploader";
import { Brain, Activity, DollarSign, Image as ImageIcon, CheckSquare, Share2 } from "lucide-react";
import { MotionWrapper } from "@/components/design-system/motion-wrapper";
import { StatusChip } from "@/components/design-system/status-chip";
import { PrivacyProvider, DataBlurToggle, SensitiveData } from "@/components/design-system/data-blur-toggle";
import { syncToHqAction } from "@/app/(dashboard)/admin/intelligence/actions";
import { Button } from "@/components/ui/button";

const toast = {
    success: (msg: string) => console.log("SUCCESS:", msg),
    error: (msg: string) => console.error("ERROR:", msg),
};

interface ProjectIntelligenceProps {
    project: any;
    events: any[];
    payments: any[];
    tasks: any[];
    screenshots: any[];
}

export function ProjectIntelligenceDetails({ project, events, payments, tasks, screenshots }: ProjectIntelligenceProps) {
    const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);

    const handleSync = async () => {
        try {
            await syncToHqAction(project.id);
            toast.success("Project synced to Aryavrat HQ successfully.");
        } catch (error) {
            toast.error("Failed to sync project.");
        }
    };

    return (
        <PrivacyProvider>
            <MotionWrapper direction="up" delay={0.1}>
                <Card className="glass-card border-white/5 bg-zinc-900/20 overflow-hidden shadow-2xl">
                    <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-glow-primary">
                                    <Brain className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl font-black uppercase tracking-tighter">Neural Insights</CardTitle>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Project Brain ID: {project.id.slice(0, 8)}</p>
                                        <StatusChip status={project.status} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <DataBlurToggle />
                                <Button
                                    onClick={handleSync}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl font-black uppercase text-[10px] tracking-widest shadow-glow-primary hover:scale-105 transition-all"
                                >
                                    <Share2 className="w-4 h-4" /> Push to Aryavrat HQ
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <Tabs defaultValue="timeline" className="space-y-10">
                            <TabsList className="bg-black/40 border border-white/5 p-1 rounded-2xl h-14 w-full justify-start overflow-x-auto no-scrollbar">
                                <TabsTrigger value="timeline" className="rounded-xl px-6 font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black transition-all flex items-center gap-2">
                                    <Activity className="w-3 h-3" /> Timeline
                                </TabsTrigger>
                                <TabsTrigger value="financials" className="rounded-xl px-6 font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black transition-all flex items-center gap-2">
                                    <DollarSign className="w-3 h-3" /> Financials
                                </TabsTrigger>
                                <TabsTrigger value="tasks" className="rounded-xl px-6 font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black transition-all flex items-center gap-2">
                                    <CheckSquare className="w-3 h-3" /> Logic Tasks
                                </TabsTrigger>
                                <TabsTrigger value="upload" className="rounded-xl px-6 font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black transition-all flex items-center gap-2">
                                    <ImageIcon className="w-3 h-3" /> Brain Feed
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="timeline" className="outline-none">
                                <MotionWrapper direction="right" delay={0.2}>
                                    <ProjectTimeline events={events} />
                                </MotionWrapper>
                            </TabsContent>

                            <TabsContent value="financials" className="outline-none">
                                <MotionWrapper direction="right" delay={0.2}>
                                    <FinancialSummary stats={{
                                        total_price: project.price,
                                        amount_received: totalPaid,
                                        pending_balance: project.price - totalPaid,
                                        currency: project.currency || 'USD'
                                    }} />
                                </MotionWrapper>
                            </TabsContent>

                            <TabsContent value="tasks" className="outline-none">
                                <MotionWrapper direction="right" delay={0.2}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {tasks.map((task, i) => (
                                            <MotionWrapper key={task.id} delay={i * 0.1} direction="up">
                                                <div className="glass-card p-6 rounded-3xl border border-white/5 bg-zinc-900/40 flex items-start gap-4 hover:border-white/10 transition-colors">
                                                    <div className={`mt-1 h-5 w-5 rounded-md border-2 ${task.status === 'done' ? 'bg-primary border-primary' : 'border-white/20'}`} />
                                                    <div>
                                                        <h5 className="font-bold text-white text-sm mb-1">{task.title}</h5>
                                                        <p className="text-zinc-500 text-[11px] leading-relaxed">{task.description}</p>
                                                        {task.due_date && <p className="text-[9px] font-black text-primary uppercase mt-2">Due: {new Date(task.due_date).toLocaleDateString()}</p>}
                                                    </div>
                                                </div>
                                            </MotionWrapper>
                                        ))}
                                    </div>
                                </MotionWrapper>
                            </TabsContent>

                            <TabsContent value="upload" className="outline-none space-y-8">
                                <MotionWrapper direction="right" delay={0.2}>
                                    <ScreenshotUploader projectId={project.id} />

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                        {screenshots.map((s, i) => (
                                            <MotionWrapper key={s.id} delay={i * 0.1} direction="up" className="aspect-square rounded-2xl overflow-hidden border border-white/10 group relative">
                                                <img src={s.public_url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Brain Feed" />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 backdrop-blur-sm">
                                                    <span className="text-[8px] font-black uppercase text-white tracking-widest text-center">{s.screenshot_type}</span>
                                                </div>
                                            </MotionWrapper>
                                        ))}
                                    </div>
                                </MotionWrapper>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </MotionWrapper>
        </PrivacyProvider>
    );
}
