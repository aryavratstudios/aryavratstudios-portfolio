"use client";

import { motion } from "framer-motion";
import { createOrder } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Send, Sparkles, Zap, Palette, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewOrderPage() {
    const [pending, setPending] = useState(false);

    return (
        <div className="max-w-3xl mx-auto py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="mb-8 flex items-center justify-between">
                    <Button asChild variant="ghost" className="text-zinc-500 hover:text-white group">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Back to Overview
                        </Link>
                    </Button>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                        <Sparkles className="w-3 h-3" />
                        Priority Creative Request
                    </div>
                </div>

                <Card className="glass-card border-white/5 bg-zinc-900/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10"></div>

                    <CardHeader className="border-b border-white/5 pb-8">
                        <CardTitle className="text-3xl font-bold">New Creative Order</CardTitle>
                        <CardDescription className="text-zinc-500 text-lg">
                            Describe your vision and we'll bring it to life with precision.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-8">
                        <form
                            action={async (formData) => {
                                setPending(true);
                                try {
                                    await createOrder(formData);
                                } finally {
                                    setPending(false);
                                }
                            }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label htmlFor="title" className="text-zinc-400 font-bold uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
                                        <Zap className="w-3 h-3 text-primary" />
                                        Project Title
                                    </Label>
                                    <Input id="title" name="title" placeholder="e.g. Neo-Matrix Brand Identity" required className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-primary focus:border-primary" />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="service" className="text-zinc-400 font-bold uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
                                        <Palette className="w-3 h-3 text-primary" />
                                        Creative Service
                                    </Label>
                                    <div className="relative">
                                        <select
                                            id="service"
                                            name="service"
                                            className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 text-white transition-all hover:bg-white/10 appearance-none"
                                            required
                                        >
                                            <option value="web_dev" className="bg-zinc-900">Web Development</option>
                                            <option value="ui_ux" className="bg-zinc-900">UI/UX Design</option>
                                            <option value="video" className="bg-zinc-900">Video Editing</option>
                                            <option value="marketing" className="bg-zinc-900">Marketing Strategy</option>
                                            <option value="other" className="bg-zinc-900">Other Custom project</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <ArrowLeft className="w-4 h-4 text-zinc-500 -rotate-90" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="description" className="text-zinc-400 font-bold uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
                                    <MessageSquare className="w-3 h-3 text-primary" />
                                    Project Brief
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe your requirements, goals, and any specific features you desire in detail..."
                                    className="min-h-[180px] bg-white/5 border-white/10 rounded-2xl p-4 text-base focus:ring-primary"
                                    required
                                />
                                <p className="text-[10px] text-zinc-600 italic">Clear briefs result in faster turnaround and better alignment.</p>
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={pending}
                                    className="w-full md:w-auto min-w-[200px] h-14 rounded-full bg-primary text-black font-bold text-lg shadow-glow-primary hover:scale-105 transition-all disabled:opacity-50"
                                >
                                    {pending ? (
                                        <span className="flex items-center gap-2">
                                            <div className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
                                            Submitting Request...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Initialize Project <Send className="w-5 h-5" />
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
