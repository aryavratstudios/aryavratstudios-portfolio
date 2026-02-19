"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Activity, Users, MoreHorizontal, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
    {
        title: "Total Revenue",
        value: "$48,294",
        change: "+24.5%",
        trend: "up",
        color: "text-emerald-500",
        icon: DollarSign,
        bg: "bg-emerald-500/10"
    },
    {
        title: "Active Orders",
        value: "156",
        change: "+12.2%",
        trend: "up",
        color: "text-blue-500",
        icon: ShoppingCart,
        bg: "bg-blue-500/10"
    },
    {
        title: "Client Retention",
        value: "92%",
        change: "-2.1%",
        trend: "down",
        color: "text-rose-500",
        icon: Users,
        bg: "bg-rose-500/10"
    },
    {
        title: "System Load",
        value: "24%",
        change: "+4.3%",
        trend: "up",
        color: "text-amber-500",
        icon: Activity,
        bg: "bg-amber-500/10"
    }
];

export function DashboardOverview() {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-3xl border border-white/5 bg-zinc-900/40"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("p-3 rounded-2xl", stat.bg)}>
                                <stat.icon className={cn("w-6 h-6", stat.color)} />
                            </div>
                            <span className={cn("text-xs font-bold px-2 py-1 rounded-full bg-white/5", stat.trend === "up" ? "text-emerald-500" : "text-rose-500")}>
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">{stat.title}</p>
                            <h3 className="text-2xl font-black text-white mt-1">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart Area */}
                <div className="lg:col-span-2 glass-card p-8 rounded-3xl border border-white/5 bg-zinc-900/40">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-white">Revenue Analytics</h3>
                            <p className="text-zinc-500 text-xs">Monthly performance overview</p>
                        </div>
                        <div className="flex bg-black/40 p-1 rounded-xl">
                            <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-white/10">Year</button>
                            <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-zinc-500 hover:text-white">Month</button>
                            <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-zinc-500 hover:text-white">Week</button>
                        </div>
                    </div>

                    {/* CSS Bar Chart */}
                    <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2">
                        {[45, 60, 35, 70, 55, 80, 65, 90, 75, 50, 85, 95].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div
                                    className="w-full rounded-t-xl transition-all duration-500 relative bg-gradient-to-t from-primary/10 to-primary/40 group-hover:bg-primary/60"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        ${h}k
                                    </div>
                                </div>
                                <span className="text-[10px] text-zinc-600 font-bold uppercase">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side Cards */}
                <div className="space-y-6">
                    {/* Sales Report */}
                    <div className="glass-card p-6 rounded-3xl border border-white/5 bg-zinc-900/40">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">Sales Report</h3>
                            <MoreHorizontal className="text-zinc-500" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">85%</span>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Product A</div>
                                    <div className="text-xs text-zinc-500">$12,400 sales</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">65%</span>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Service B</div>
                                    <div className="text-xs text-zinc-500">$8,200 sales</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="glass-card p-6 rounded-3xl border border-white/5 bg-zinc-900/40">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">Upcoming</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="p-2 bg-black/40 rounded-lg text-zinc-400">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-white">Strategy Meeting</div>
                                    <div className="text-[10px] text-zinc-500">Today, 2:00 PM</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="p-2 bg-black/40 rounded-lg text-zinc-400">
                                    <Activity className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-white">Design Review</div>
                                    <div className="text-[10px] text-zinc-500">Tomorrow, 10:00 AM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
