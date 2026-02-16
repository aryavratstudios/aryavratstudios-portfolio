"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    PlusCircle,
    List,
    Settings,
    Shield,
    Briefcase,
    LogOut,
    ChevronRight,
    Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SidebarProps {
    role: string;
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/new", label: "New Order", icon: PlusCircle },
        { href: "/dashboard/orders", label: "My Orders", icon: List },
    ];

    const adminItems = [
        { href: "/admin", label: "All Projects", icon: Shield },
        { href: "/work", label: "Portfolio", icon: Briefcase },
    ];

    return (
        <aside className="hidden md:flex flex-col w-72 border-r border-white/5 bg-zinc-950 h-screen sticky top-0 z-40">
            <div className="p-8">
                <Link href="/" className="flex items-center gap-3 font-bold text-2xl tracking-tighter">
                    <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-glow">
                        <span className="text-black text-xl font-bold">A</span>
                    </div>
                    <span className="text-white">Aryavrat<span className="text-primary">.</span></span>
                </Link>
            </div>

            <div className="flex-1 px-4 space-y-8 overflow-y-auto">
                <div className="space-y-1">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 px-4">Workspace</div>
                    {menuItems.map((item) => (
                        <NavItem
                            key={item.href}
                            item={item}
                            active={pathname === item.href}
                        />
                    ))}
                </div>

                {role === 'admin' && (
                    <div className="space-y-1">
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 px-4">Administration</div>
                        {adminItems.map((item) => (
                            <NavItem
                                key={item.href}
                                item={item}
                                active={pathname === item.href}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="p-6 border-t border-white/5 space-y-4">
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary mb-1">
                        <Star className="w-3 h-3 fill-primary" />
                        PREMIUM PARTNER
                    </div>
                    <p className="text-[10px] text-zinc-500">You have active priority support.</p>
                </div>

                <form action="/auth/signout" method="post">
                    <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl group" type="submit">
                        <LogOut className="mr-3 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Sign Out
                    </Button>
                </form>
            </div>
        </aside>
    );
}

function NavItem({ item, active }: { item: any, active: boolean }) {
    return (
        <Link
            href={item.href}
            className={cn(
                "flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-300",
                active
                    ? "bg-primary text-black font-bold shadow-glow-primary"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
        >
            <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5", active ? "text-black" : "text-zinc-500 group-hover:text-primary transition-colors")} />
                <span className="text-sm tracking-tight">{item.label}</span>
            </div>
            {active && (
                <motion.div
                    layoutId="active-pill"
                    className="h-1.5 w-1.5 rounded-full bg-black/40"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
            {!active && (
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
            )}
        </Link>
    );
}
