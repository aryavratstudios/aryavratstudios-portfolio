"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { label: "Sales", value: "1.345", change: "+12%", trend: "up", sub: "Week comparison", color: "text-emerald-400", bg: "bg-emerald-400/10" },
                { label: "Leads", value: "3.820", change: "-5%", trend: "down", sub: "Month comparison", color: "text-rose-400", bg: "bg-rose-400/10" },
                { label: "Income", value: "$690.00", change: "+8%", trend: "up", sub: "Week comparison", color: "text-emerald-400", bg: "bg-emerald-400/10" }
            ].map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-stone-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative overflow-hidden group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-lg font-bold text-white">{stat.label}</span>
                        <div className={cn("flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg", stat.bg, stat.color)}>
                            {stat.change}
                            {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        </div>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-4xl font-bold tracking-tight text-white">{stat.value}</span>
                    </div>
                    <p className="text-white/30 text-xs">{stat.sub}</p>

                    {/* Progress Bar Visual */}
                    <div className="w-full h-1 bg-white/5 rounded-full mt-6 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "70%" }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className={cn("h-full rounded-full", stat.trend === 'up' ? 'bg-emerald-500' : 'bg-rose-500')}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
