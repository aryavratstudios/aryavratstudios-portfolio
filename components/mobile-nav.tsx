"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, PlusCircle, List, Shield, Briefcase, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

interface MobileNavProps {
    role: string;
}

export function MobileNav({ role }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false);
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

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 p-4">
            <div className="glass-card rounded-2xl p-3 flex justify-between items-center border border-foreground/10 shadow-lg">
                <Link href="/" className="flex items-center gap-3 overflow-hidden">
                    <Logo size={32} showGlow />
                    <div className="flex flex-col">
                        <span className="text-xs font-black tracking-tighter text-foreground uppercase">AryavratHQ</span>
                        <span className="text-[8px] uppercase tracking-[0.2em] font-black text-primary leading-none">Studios</span>
                    </div>
                </Link>

                <button onClick={toggleMenu} className="p-2 text-primary hover:bg-foreground/5 rounded-xl transition-colors">
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute top-20 left-4 right-4 z-50"
                    >
                        <div className="glass-card rounded-[32px] p-6 border border-foreground/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl space-y-8">
                            <div className="space-y-2">
                                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] px-4 mb-2">Workspace</div>
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all",
                                            pathname === item.href
                                                ? "bg-primary text-black font-bold shadow-glow-primary"
                                                : "text-zinc-500 hover:text-foreground hover:bg-foreground/5"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                    </Link>
                                ))}
                            </div>

                            {role === 'admin' && (
                                <div className="space-y-2">
                                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] px-4 mb-2">Administration</div>
                                    <Link
                                        href="/admin"
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all",
                                            pathname === "/admin"
                                                ? "bg-primary text-black font-bold shadow-glow-primary"
                                                : "text-zinc-500 hover:text-foreground hover:bg-foreground/5"
                                        )}
                                    >
                                        <Shield className="h-5 w-5" />
                                        <span className="text-sm font-medium tracking-tight">Admin Dashboard</span>
                                    </Link>
                                    <Link
                                        href="/admin/invoices"
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all",
                                            pathname === "/admin/invoices"
                                                ? "bg-primary text-black font-bold shadow-glow-primary"
                                                : "text-zinc-500 hover:text-foreground hover:bg-foreground/5"
                                        )}
                                    >
                                        <Briefcase className="h-5 w-5" />
                                        <span className="text-sm font-medium tracking-tight">Invoices</span>
                                    </Link>
                                </div>
                            )}

                            <div className="pt-4 border-t border-foreground/5">
                                <form action="/auth/signout" method="post">
                                    <Button variant="ghost" className="w-full justify-start text-zinc-500 hover:text-accent hover:bg-accent/10 rounded-2xl h-14" type="submit">
                                        <LogOut className="mr-3 h-5 w-5" />
                                        <span className="font-bold uppercase text-[10px] tracking-widest">Sign Out</span>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
