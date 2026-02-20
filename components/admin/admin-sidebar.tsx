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
    Wallet,
    PlusSquare,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function AdminSidebar() {
    const pathname = usePathname();

    const admins = [
        { name: "Abhinav", role: "Super Admin", initial: "AB", color: "from-purple-500 to-indigo-500" },
        { name: "Aryavrat", role: "Admin", initial: "AS", color: "from-pink-500 to-rose-500" },
    ];

    return (
        <aside className="w-64 h-screen sticky top-0 flex flex-col z-40 hidden md:flex p-6 overflow-hidden">
            {/* Background with spec shadow and blur */}
            <div className="absolute inset-x-0 inset-y-0 bg-stone-950/80 rounded-3xl shadow-[0px_64px_64px_-32px_rgba(41,15,0,0.56)] border-[0.50px] border-stone-400 backdrop-blur-[80px] -z-10" />

            {/* User Profile Section */}
            <div className="flex items-center gap-4 relative mb-12 mt-2">
                <div className="relative">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarImage src="https://placehold.co/48x48" alt="Admin" />
                        <AvatarFallback className="bg-primary/20 text-primary">AD</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 flex gap-0.5">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full border border-stone-900" />
                        <div className="w-2.5 h-2.5 bg-amber-400 rounded-full border border-stone-900" />
                        <div className="w-2.5 h-2.5 bg-lime-600 rounded-full border border-stone-900" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider leading-none">Super Admin</span>
                    <span className="text-white text-sm font-bold leading-none mt-1">Aryavrat HQ</span>
                </div>
            </div>

            <nav className="flex-1 space-y-10 overflow-y-auto no-scrollbar pr-2">
                {/* Main Menu */}
                <div className="space-y-4">
                    <div className="px-5 text-white/30 text-xs font-bold uppercase leading-6 tracking-wide flex items-center gap-2">
                        Main <Shield className="w-3 h-3" />
                    </div>

                    <div className="space-y-1">
                        <Link href="/admin" className={cn(
                            "group self-stretch px-5 py-4 relative rounded-xl border-[0.50px] inline-flex justify-start items-center gap-4 overflow-hidden transition-all duration-300",
                            pathname === "/admin"
                                ? "bg-white/10 text-white border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                : "text-white/50 border-transparent hover:bg-white/5 hover:text-white"
                        )}>
                            <LayoutDashboard className="w-5 h-5 relative z-10" />
                            <span className="flex-1 text-sm font-medium relative z-10">Dashboard</span>
                            {pathname === "/admin" && (
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50" />
                            )}
                        </Link>

                        <div className="pl-12 flex flex-col gap-2">
                            <div className="px-3.5 py-2 text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-stone-700" /> Activity
                            </div>
                            <div className="px-3.5 py-2 text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-stone-700" /> Traffic
                            </div>
                        </div>

                        <Link href="/admin/invoices" className="flex items-center gap-4 px-5 py-4 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all group">
                            <FileText className="w-5 h-5" />
                            <span className="text-sm font-medium">Invoices</span>
                        </Link>
                        <Link href="/admin/wallet" className="flex items-center gap-4 px-5 py-4 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all group">
                            <Wallet className="w-5 h-5" />
                            <span className="text-sm font-medium">Wallet</span>
                        </Link>
                    </div>
                </div>

                {/* Team Access Section */}
                <div className="space-y-4">
                    <div className="px-5 flex items-center justify-between">
                        <span className="text-white/30 text-xs font-bold uppercase tracking-wide">Team Access</span>
                        <PlusSquare className="w-3 h-3 text-white/30" />
                    </div>
                    <div className="space-y-3 px-1">
                        {admins.map((admin) => (
                            <div key={admin.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className={cn("w-8 h-8 rounded-full p-[1px] bg-gradient-to-tr", admin.color)}>
                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] text-white font-bold">
                                        {admin.initial}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-white/80 font-medium group-hover:text-white">{admin.name}</span>
                                    <span className="text-[10px] text-white/30 uppercase tracking-tighter">{admin.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Bottom Card (Control Center) */}
            <div className="mt-6 mb-4 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-600/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-rose-950/10 backdrop-blur-md rounded-2xl p-5 border border-stone-400 shadow-[0px_64px_64px_-32px_rgba(102,37,0,0.56)] overflow-hidden">
                    <div className="flex flex-col gap-1 mb-4 text-center">
                        <h4 className="text-white font-bold text-sm tracking-tight">Control Center</h4>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Manage Permissions</p>
                    </div>
                    <button className="w-full bg-orange-400 hover:bg-orange-500 text-white shadow-[0px_4px_24px_0px_rgba(168,82,5,0.30)] text-xs font-bold rounded-xl py-3 flex items-center justify-center gap-2 transition-all transform active:scale-95 group">
                        <Plus className="w-4 h-4" />
                        <span>Add Admin</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                </div>
            </div>

            {/* Sign Out */}
            <form action="/auth/signout" method="post" className="mt-2 text-center">
                <button type="submit" className="flex items-center justify-center w-full gap-2 text-white/20 hover:text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors py-2 group">
                    <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Sign Out
                </button>
            </form>
        </aside>
    );
}
