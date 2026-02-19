"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, Target, ArrowDownRight, MoreHorizontal, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function RecentActivity() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-stone-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Updates</h2>
                <button className="text-white/40 hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4">
                {[
                    { title: "New Lead Created", time: "30 min ago", value: "+$0.00", icon: Users, color: "bg-blue-500" },
                    { title: "Item Sale #340", time: "2 hours ago", value: "+$890.00", icon: DollarSign, color: "bg-emerald-500" },
                    { title: "New Subscriber", time: "4 hours ago", value: "+$49.00", icon: Target, color: "bg-purple-500" },
                    { title: "Refund Request", time: "6 hours ago", value: "-$120.00", icon: ArrowDownRight, color: "bg-rose-500" },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg", item.color)}>
                            <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.title}</h4>
                            <p className="text-xs text-white/30">{item.time}</p>
                        </div>
                        <span className={cn("text-xs font-bold", item.value.startsWith('+') ? 'text-emerald-400' : 'text-zinc-500')}>
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
                <h3 className="text-sm font-bold mb-4 text-white">Upcoming Events</h3>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div className="text-white">
                            <p className="text-sm font-bold">Team Meeting</p>
                            <p className="text-xs text-white/40">Today, 2:00 PM</p>
                        </div>
                    </div>
                    <div className="flex -space-x-2 mt-2 ml-13 pl-13">
                        <Avatar className="w-6 h-6 border border-black"><AvatarImage src="https://placehold.co/24x24" /></Avatar>
                        <Avatar className="w-6 h-6 border border-black"><AvatarImage src="https://placehold.co/24x24" /></Avatar>
                        <Avatar className="w-6 h-6 border border-black"><AvatarImage src="https://placehold.co/24x24" /></Avatar>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
