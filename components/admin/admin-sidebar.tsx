"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    MessageSquare,
    Settings,
    Plus,
    LogOut,
    Users,
    Shield,
    FileText,
    Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen sticky top-0 flex flex-col justify-between py-6 z-40 hidden md:flex">
            {/* Glass Background Layer */}
            <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-3xl border-r border-stone-800 rounded-r-3xl" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full px-6">

                {/* User Profile Header */}
                <div className="flex items-center gap-4 mb-10 mt-2">
                    <div className="relative">
                        <Avatar className="w-12 h-12 border-2 border-primary/20">
                            <AvatarImage src="https://placehold.co/48x48" alt="Admin" />
                            <AvatarFallback className="bg-primary/20 text-primary">AD</AvatarFallback>
                        </Avatar>
                        <span className="absolute -bottom-1 -right-1 flex gap-0.5">
                            <div className="w-2.5 h-2.5 bg-red-500 rounded-full border border-black" />
                            <div className="w-2.5 h-2.5 bg-amber-400 rounded-full border border-black" />
                            <div className="w-2.5 h-2.5 bg-lime-600 rounded-full border border-black" />
                        </span>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-white/40">Super Admin</p>
                        <p className="text-sm font-bold text-white leading-none mt-1">Aryavrat HQ</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">

                    {/* Main Section */}
                    <div className="space-y-2">
                        <div className="px-3 mb-2 flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-white/30">Main</span>
                        </div>

                        <Link
                            href="/admin"
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                pathname === "/admin"
                                    ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10"
                                    : "text-white/50 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <LayoutDashboard className="w-5 h-5 relative z-10" />
                            <span className="text-sm font-medium relative z-10">Dashboard</span>
                            {pathname === "/admin" && (
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50" />
                            )}
                        </Link>

                        <div className="pl-4 space-y-1 mt-1">
                            <div className="flex items-center gap-3 px-4 py-2 text-white/40 text-xs hover:text-white cursor-pointer transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-stone-700" /> Activity
                            </div>
                            <div className="flex items-center gap-3 px-4 py-2 text-white/40 text-xs hover:text-white cursor-pointer transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-stone-700" /> Traffic
                            </div>
                            <div className="flex items-center gap-3 px-4 py-2 text-white/40 text-xs hover:text-white cursor-pointer transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-stone-700" /> Statistic
                            </div>
                        </div>

                        <Link
                            href="/admin/invoices"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300"
                        >
                            <FileText className="w-5 h-5" />
                            <span className="text-sm font-medium">Invoices</span>
                        </Link>
                        <Link
                            href="/admin/wallet"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300"
                        >
                            <Wallet className="w-5 h-5" />
                            <span className="text-sm font-medium">Wallet</span>
                        </Link>
                    </div>

                    {/* Messages/Users Section */}
                    <div className="space-y-2">
                        <div className="px-3 mb-2 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-white/30">Team Access</span>
                            <Shield className="w-3 h-3 text-white/30" />
                        </div>

                        <div className="space-y-3 pl-1">
                            {/* Admin List Placeholder */}
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 p-[1px]">
                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] text-white font-bold">AB</div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-white/80 font-medium group-hover:text-white">Abhinav</span>
                                    <span className="text-[10px] text-white/30">Super Admin</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 p-[1px]">
                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] text-white font-bold">AS</div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-white/80 font-medium group-hover:text-white">Aryavrat</span>
                                    <span className="text-[10px] text-white/30">Admin</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Bottom Card */}
                <div className="mt-6 mb-4 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-600/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-stone-900/80 backdrop-blur-md rounded-2xl p-4 border border-white/10 overflow-hidden">
                        <div className="flex flex-col gap-1 mb-3">
                            <h4 className="text-white font-bold text-sm">Control Center</h4>
                            <p className="text-[10px] text-zinc-400">Manage users and permissions</p>
                        </div>
                        <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white shadow-lg text-xs font-bold rounded-xl py-2.5 flex items-center justify-center gap-2 transition-all transform active:scale-95">
                            <Plus className="w-4 h-4" />
                            Add Admin
                        </button>
                    </div>
                </div>

                {/* Sign Out */}
                <form action="/auth/signout" method="post">
                    <button type="submit" className="flex items-center gap-2 text-white/20 hover:text-red-400 text-xs font-bold uppercase tracking-wider transition-colors py-2">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </form>
            </div>
        </aside>
    );
}
