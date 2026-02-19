"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Activity,
    BarChart3,
    PieChart,
    Receipt,
    Wallet,
    Bell,
    Plus,
    MessageSquare,
    User,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
    role: string;
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen sticky top-0 bg-stone-950/60 backdrop-blur-[80px] border-r border-stone-800 flex flex-col justify-between py-6 z-40 hidden md:flex">
            {/* Top Section: User Profile */}
            <div className="px-6 flex items-center gap-4">
                <div className="relative w-12 h-12">
                    <div className="w-12 h-12 bg-red-200 rounded-full overflow-hidden">
                        <img src="https://placehold.co/48x48" alt="Profile" className="object-cover" />
                    </div>
                    {/* Status Dots */}
                    <div className="absolute -bottom-1 -right-1 flex gap-0.5">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full border border-black" />
                        <div className="w-2.5 h-2.5 bg-amber-400 rounded-full border border-black" />
                        <div className="w-2.5 h-2.5 bg-lime-600 rounded-full border border-black" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider">Product Designer</span>
                    <span className="text-white font-bold text-sm">Andrew Smith</span>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="flex-1 px-4 mt-10 space-y-8 overflow-y-auto custom-scrollbar">

                {/* Main Menu */}
                <div className="space-y-2">
                    <div className="px-4 text-white/30 text-xs font-bold uppercase tracking-wider mb-2">Main</div>

                    <Link href="/dashboard" className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all border border-transparent",
                        pathname === "/dashboard"
                            ? "bg-white/5 border-stone-700 shadow-[0_0_16px_rgba(255,255,255,0.1)] text-white"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                    )}>
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>

                    {/* Collapsible Stats Section (Visual only for now) */}
                    <div className="pl-4 space-y-1 mt-2">
                        <div className="flex items-center gap-3 px-4 py-2 text-white/60 text-xs hover:text-white cursor-pointer">
                            <Activity className="w-4 h-4" /> Activity
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 text-white/60 text-xs hover:text-white cursor-pointer">
                            <BarChart3 className="w-4 h-4" /> Traffic
                        </div>
                        <div className={cn(
                            "flex items-center gap-3 px-4 py-2 rounded-lg transition-all",
                            pathname === "/stats" ? "bg-white/5 text-white shadow-[0_0_16px_rgba(255,255,255,0.1)]" : "text-white/60 hover:text-white"
                        )}>
                            <PieChart className="w-4 h-4" /> Statistic
                        </div>
                    </div>

                    <Link href="/dashboard/invoices" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all">
                        <Receipt className="w-5 h-5" />
                        <span className="text-sm font-medium">Invoices</span>
                    </Link>
                    <Link href="/dashboard/wallet" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all">
                        <Wallet className="w-5 h-5" />
                        <span className="text-sm font-medium">Wallet</span>
                    </Link>
                    <Link href="/dashboard/notifications" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all">
                        <Bell className="w-5 h-5" />
                        <span className="text-sm font-medium">Notification</span>
                    </Link>
                </div>

                {/* Messages Section */}
                <div className="space-y-2">
                    <div className="px-4 flex items-center justify-between text-white/30 text-xs font-bold uppercase tracking-wider mb-2">
                        <span>Messages</span>
                        <MessageSquare className="w-4 h-4" />
                    </div>
                    {/* Placeholder Users */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl border border-stone-800/50 bg-stone-900/20">
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-red-200 overflow-hidden"><img src="https://placehold.co/32x32" /></div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-neutral-400 rounded-full border-2 border-black"></div>
                            </div>
                            <span className="text-sm text-white/60 font-medium">Erik Gunsel</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl border border-stone-800/50 bg-stone-900/20">
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-orange-200 overflow-hidden"><img src="https://placehold.co/32x32" /></div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-stone-900 rounded-full border-2 border-black"></div>
                            </div>
                            <span className="text-sm text-white/60 font-medium">Emily Smith</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom CTA Card */}
            <div className="px-4 mb-6">
                <div className="bg-rose-950/10 rounded-3xl p-5 border border-stone-800 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col gap-2 mb-4">
                        <h4 className="text-white font-semibold leading-tight">Let's start!</h4>
                        <p className="text-white/60 text-xs leading-relaxed">Creating or adding new tasks couldn't be easier</p>
                    </div>
                    <button className="w-full bg-orange-400 hover:bg-orange-500 text-white shadow-lg shadow-orange-500/20 rounded-xl py-2.5 flex items-center justify-center gap-2 transition-all active:scale-95">
                        <Plus className="w-5 h-5 text-white" />
                        <span className="text-sm font-semibold">Add New Task</span>
                    </button>
                </div>
            </div>

            {/* Sign Out (Hidden but accessible) */}
            <form action="/auth/signout" method="post" className="px-6">
                <button type="submit" className="flex items-center gap-2 text-white/20 hover:text-red-400 text-xs font-bold uppercase tracking-wider transition-colors">
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            </form>
        </aside>
    );
}
