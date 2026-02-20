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
    LogOut,
    ChevronDown,
    PlusSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
    role: string;
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();

    const navItems = [
        { name: "Invoices", icon: Receipt, href: "/dashboard/invoices" },
        { name: "Wallet", icon: Wallet, href: "/dashboard/wallet" },
        { name: "Notification", icon: Bell, href: "/dashboard/notifications" },
    ];

    const users = [
        { name: "Erik Gunsel", avatar: "https://placehold.co/24x24", status: "bg-neutral-400" },
        { name: "Emily Smith", avatar: "https://placehold.co/24x24", status: "bg-stone-900" },
        { name: "Arthur Adelk", avatar: "https://placehold.co/24x24", status: "bg-neutral-400" },
    ];

    return (
        <aside className="w-64 h-screen sticky top-0 flex flex-col z-40 hidden md:flex p-6 overflow-hidden">
            {/* Background with spec shadow and blur */}
            <div className="absolute inset-x-0 inset-y-0 bg-stone-950/60 rounded-3xl shadow-[0px_64px_64px_-32px_rgba(41,15,0,0.56)] border-[0.50px] border-stone-400 backdrop-blur-[80px] -z-10" />

            {/* User Profile Section */}
            <div className="flex items-center gap-4 relative mb-12">
                <div className="relative">
                    <img className="w-12 h-12 rounded-full border-2 border-stone-800" src="https://placehold.co/48x48" alt="Andrew Smith" />
                    <div className="absolute -top-1 -right-1 flex gap-0.5">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full border border-stone-900" />
                        <div className="w-2.5 h-2.5 bg-amber-400 rounded-full border border-stone-900" />
                        <div className="w-2.5 h-2.5 bg-lime-600 rounded-full border border-stone-900" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-white/30 text-[10px] font-medium uppercase tracking-wide leading-5">Product Designer</span>
                    <span className="text-white text-sm font-medium leading-5 [text-shadow:_0px_0px_16px_rgb(255_255_255_/_1.00)]">Andrew Smith</span>
                </div>
                <div className="absolute right-0 w-6 h-6 rotate-90 bg-stone-950/40 rounded-3xl border border-stone-400 backdrop-blur-[90px] flex items-center justify-center cursor-pointer">
                    <div className="w-1.5 h-3 bg-white/25 rounded-sm" />
                </div>
            </div>

            <div className="flex-1 space-y-10 overflow-y-auto no-scrollbar">
                {/* Main Menu */}
                <div className="space-y-4">
                    <div className="px-5 text-white/30 text-xs font-medium uppercase leading-6 tracking-wide">Main</div>

                    {/* Active Dashboard Link */}
                    <div className="space-y-1">
                        <Link href="/dashboard" className={cn(
                            "group self-stretch px-5 py-4 relative rounded-xl border-[0.50px] inline-flex justify-start items-center gap-4 overflow-hidden transition-all",
                            pathname === "/dashboard"
                                ? "bg-white/5 border-stone-400"
                                : "border-transparent hover:bg-white/5"
                        )}>
                            {pathname === "/dashboard" && (
                                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_rgba(204,_138.72,_138.72,_0.48)_0%,_rgba(163.20,_58.75,_58.75,_0)_100%)] blur-[20px]" />
                            )}
                            <div className={cn(
                                "w-6 h-6 relative z-10",
                                pathname === "/dashboard" && "shadow-[0px_0px_16px_0px_rgba(255,255,255,1.00)]"
                            )}>
                                <LayoutDashboard className="w-6 h-6 text-white" />
                            </div>
                            <span className={cn(
                                "flex-1 text-sm font-medium leading-5 z-10",
                                pathname === "/dashboard" ? "text-white [text-shadow:_0px_0px_16px_rgb(255_255_255_/_1.00)]" : "text-white/60"
                            )}>Dashboard</span>
                            <ChevronDown className="w-4 h-4 text-white/30 rotate-180" />
                        </Link>

                        {/* Sub Menu */}
                        <div className="pl-12 flex flex-col gap-2">
                            <div className="px-3.5 py-2 text-white/60 text-xs font-medium leading-5 hover:text-white transition-colors cursor-pointer">Activity</div>
                            <div className="px-3.5 py-2 text-white/60 text-xs font-medium leading-5 hover:text-white transition-colors cursor-pointer">Traffic</div>
                            <div className="px-3.5 py-2 relative bg-white/5 rounded-xl border-[0.50px] border-stone-400 group overflow-hidden">
                                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_rgba(204,_138.72,_138.72,_0.48)_0%,_rgba(163.20,_58.75,_58.75,_0)_100%)] blur-[20px]" />
                                <div className="relative text-white text-xs font-medium leading-5 px-3.5 py-2 [text-shadow:_0px_0px_16px_rgb(255_255_255_/_1.00)]">Statistic</div>
                            </div>
                        </div>
                    </div>

                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} className="self-stretch px-5 py-4 rounded-xl hover:bg-white/5 inline-flex justify-start items-center gap-4 group transition-all">
                            <item.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                            <span className="flex-1 text-white/60 text-sm font-medium leading-5 group-hover:text-white group-hover:[text-shadow:_0px_0px_16px_rgb(255_255_255_/_1.00)]">{item.name}</span>
                        </Link>
                    ))}
                </div>

                <div className="w-full h-[0.50px] opacity-30 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#CC8B8B_0%,_rgba(163.20,_58.75,_58.75,_0)_100%)]" />

                {/* Messages Section */}
                <div className="space-y-4">
                    <div className="px-5 flex items-center justify-between">
                        <span className="text-white/30 text-xs font-medium uppercase leading-6 tracking-wide">Messages</span>
                        <PlusSquare className="w-3 h-3 text-white/30" />
                    </div>
                    <div className="space-y-1">
                        {users.map((user) => (
                            <div key={user.name} className="self-stretch px-5 py-4 relative rounded-xl hover:bg-white/5 inline-flex justify-start items-center gap-4 cursor-pointer group transition-all">
                                <div className="relative">
                                    <img className="w-6 h-6 rounded-full" src={user.avatar} alt={user.name} />
                                    <div className={cn("w-1.5 h-1.5 absolute -bottom-0.5 -right-0.5 rounded-full border border-black", user.status)} />
                                </div>
                                <span className="text-white/60 text-sm font-medium leading-5 group-hover:text-white transition-colors">{user.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom CTA Section */}
            <div className="mt-auto pt-6">
                <div className="px-4 pt-6 pb-4 bg-rose-950/10 rounded-3xl shadow-[0px_64px_64px_-32px_rgba(102,37,0,0.56)] border border-stone-400 flex flex-col gap-5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex flex-col gap-1.5">
                        <div className="text-white text-base font-semibold text-center tracking-tight leading-6">Let's start!</div>
                        <div className="text-white/60 text-xs font-medium text-center leading-5">Creating or adding new tasks couldn't be easier</div>
                    </div>
                    <Link href="/dashboard/new" className="w-full h-12 bg-orange-400 hover:bg-orange-500 rounded-xl shadow-[0px_4px_24px_0px_rgba(168,82,5,0.30)] flex justify-center items-center gap-1.5 transition-all active:scale-95 group">
                        <Plus className="w-5 h-5 text-white" />
                        <span className="text-white text-sm font-semibold leading-5 text-center">Add New Task</span>
                    </Link>
                </div>

                <form action="/auth/signout" method="post" className="mt-8">
                    <button type="submit" className="flex items-center gap-2 text-white/20 hover:text-red-400 text-[10px] font-bold uppercase tracking-widest transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </form>
            </div>
        </aside>
    );
}
