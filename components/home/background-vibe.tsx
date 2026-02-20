"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Grid, Cloud, Moon } from "lucide-react";

export function BackgroundVibe() {
    const [vibe, setVibe] = useState<"noise" | "grid" | "stars" | "glow">("noise");

    useEffect(() => {
        // Here we could update global CSS variables or context if needed
    }, [vibe]);

    const vibes = [
        { id: "noise", icon: Cloud, label: "Textured" },
        { id: "grid", icon: Grid, label: "Blueprint" },
        { id: "stars", icon: Sparkles, label: "Cosmic" },
        { id: "glow", icon: Moon, label: "Ambient" },
    ];

    return (
        <>
            {/* Background Layer (Fixed) */}
            <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden bg-background">
                <AnimatePresence mode="wait">
                    {vibe === "noise" && (
                        <motion.div
                            key="noise"
                            initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
                        />
                    )}
                    {vibe === "grid" && (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"
                        />
                    )}
                    {vibe === "stars" && (
                        <motion.div
                            key="stars"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0"
                        >
                            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                            <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-white rounded-full animate-ping delay-700"></div>
                            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                        </motion.div>
                    )}
                    {vibe === "glow" && (
                        <motion.div
                            key="glow"
                            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Toggle */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
                <div className="flex gap-2 p-1.5 rounded-2xl bg-black/40 backdrop-blur-3xl border border-white/5 shadow-2xl scale-0 group-hover:scale-100 origin-bottom-right transition-all duration-300">
                    {vibes.map((v) => (
                        <button
                            key={v.id}
                            onClick={() => setVibe(v.id as any)}
                            className={`p-2 rounded-xl transition-all ${vibe === v.id ? 'bg-primary text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                            title={v.label}
                        >
                            <v.icon size={18} />
                        </button>
                    ))}
                </div>
                <button className="h-12 w-12 rounded-2xl bg-black/40 backdrop-blur-3xl border border-primary/20 flex items-center justify-center text-primary shadow-glow-primary hover:scale-110 transition-all">
                    <Sparkles size={20} />
                </button>
            </div>
        </>
    );
}
