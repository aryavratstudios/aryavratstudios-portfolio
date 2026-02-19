"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function OrdersChart() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-stone-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 min-h-[400px]"
        >
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Orders</h2>
                <div className="flex bg-white/5 rounded-lg p-1">
                    {['Day', 'Week', 'Month'].map((period, i) => (
                        <button
                            key={period}
                            className={cn(
                                "px-4 py-1.5 text-xs font-medium rounded-md transition-all",
                                i === 1 ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white"
                            )}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            {/* Faux Chart Area */}
            <div className="relative h-64 w-full flex items-end justify-between gap-2 px-4 border-b border-white/5 pb-4">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                    {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-white" />)}
                </div>

                {/* Bars / Graph Line */}
                {[30, 45, 35, 60, 50, 75, 40, 55, 70, 65, 50, 60].map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.5 + (i * 0.05), duration: 0.5 }}
                        className="w-full bg-gradient-to-t from-primary/20 to-primary/60 rounded-t-sm hover:from-primary/40 hover:to-primary/80 transition-colors relative group"
                    >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            ${h * 10}
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-between mt-4 px-4 text-xs text-white/30 font-medium">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                    <span key={m}>{m}</span>
                ))}
            </div>
        </motion.div>
    );
}
