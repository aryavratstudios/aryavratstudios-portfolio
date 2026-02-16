"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, PlusCircle, List, Shield, Briefcase, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
            <div className="glass-card rounded-2xl p-3 flex justify-between items-center border border-white/10 backdrop-blur-xl">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tighter">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-black text-xs font-black">A</span>
                    </div>
                    <span className="text-white">Aryavrat<span className="text-primary italic">.</span></span>
                </Link>

                <button onClick={toggleMenu} className="p-2 text-primary hover:bg-white/5 rounded-xl transition-colors">
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-4 right-4 z-50"
                    >
                        <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl backdrop-blur-2xl space-y-8">
                            <div className="space-y-2">
                                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-4">Workspace</div>
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all",
                                            pathname === item.href ? "bg-primary text-black font-bold" : "text-zinc-400 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>

                            {role === 'admin' && (
                                <div className="space-y-2">
                                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-4">Administration</div>
                                    {adminItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all",
                                                pathname === item.href ? "bg-primary text-black font-bold" : "text-zinc-400 hover:text-white hover:bg-white/5"
                                            )}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <div className="pt-4 border-t border-white/5">
                                <form action="/auth/signout" method="post">
                                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-500 hover:bg-red-500/5 rounded-2xl h-14" type="submit">
                                        <LogOut className="mr-3 h-5 w-5" />
                                        Sign Out
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
