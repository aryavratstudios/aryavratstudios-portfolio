"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, [supabase]);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Work", href: "/work" },
        { name: "About", href: "#" },
    ];

    const aboutSubItems = [
        { name: "About Us", href: "/about" },
        { name: "About Team", href: "/team" },
        { name: "Why Us", href: "/why-us" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-3 transition-all duration-300",
                isScrolled ? "py-2" : "py-4"
            )}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn(
                    "w-full max-w-6xl rounded-2xl flex items-center justify-between px-6 py-3 transition-all duration-300 backdrop-blur-xl border",
                    isScrolled 
                        ? "bg-black/80 border-white/10 shadow-xl shadow-black/20" 
                        : "bg-black/60 border-white/10 shadow-lg shadow-black/10"
                )}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                        <span className="text-black text-xl font-black">A</span>
                    </div>
                    <div className="hidden sm:block">
                        <span className="text-white font-bold text-lg tracking-tight">Aryavrat<span className="text-primary">.</span></span>
                        <div className="text-[10px] text-zinc-500 -mt-1 tracking-widest">STUDIOS</div>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {navItems.map((item) => (
                        <div
                            key={item.name}
                            className="relative px-4 py-2.5"
                            onMouseEnter={() => {
                                setHoveredItem(item.name);
                                if (item.name === "About") setIsAboutOpen(true);
                            }}
                            onMouseLeave={() => {
                                setHoveredItem(null);
                                if (item.name === "About") setIsAboutOpen(false);
                            }}
                        >
                            <Link
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors relative z-10 flex items-center gap-1.5",
                                    hoveredItem === item.name ? "text-white" : "text-zinc-400 hover:text-white"
                                )}
                            >
                                {item.name}
                                {item.name === "About" && (
                                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isAboutOpen && "rotate-180")} />
                                )}
                            </Link>

                            {hoveredItem === item.name && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute bottom-2 left-4 right-4 h-0.5 bg-primary rounded-full z-0"
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    exit={{ scaleX: 0, opacity: 0 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    style={{ transformOrigin: "left" }}
                                />
                            )}

                            {item.name === "About" && (
                                <AnimatePresence>
                                    {isAboutOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-52"
                                            onMouseEnter={() => setIsAboutOpen(true)}
                                            onMouseLeave={() => setIsAboutOpen(false)}
                                        >
                                            <div className="bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-2 shadow-2xl">
                                                {aboutSubItems.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="flex items-center px-4 py-3 text-sm font-medium text-zinc-400 hover:text-primary hover:bg-white/5 rounded-xl transition-all"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <Button asChild className="hidden sm:flex rounded-xl px-5 text-sm font-semibold bg-primary text-black hover:bg-primary/90 shadow-lg shadow-primary/20">
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                    ) : (
                        <Button asChild className="hidden sm:flex rounded-xl px-5 text-sm font-semibold bg-white text-black hover:bg-zinc-200">
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                    
                    <Button asChild className="rounded-xl px-4 sm:px-5 text-sm font-semibold bg-primary text-black hover:bg-primary/90 shadow-lg shadow-primary/20">
                        <Link href="/dashboard/new">
                            <span className="hidden sm:inline">Start Project</span>
                            <span className="sm:hidden">Start</span>
                        </Link>
                    </Button>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-3 mx-4 glass-card rounded-2xl border border-white/10 overflow-hidden lg:hidden"
                    >
                        <div className="p-4 space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-4 py-3.5 text-base font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="border-t border-white/10 pt-2 mt-2">
                                {aboutSubItems.map((subItem) => (
                                    <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        className="block pl-8 pr-4 py-3 text-sm font-medium text-zinc-500 hover:text-primary hover:bg-white/5 rounded-xl transition-all"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {subItem.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="pt-4 border-t border-white/10 space-y-2">
                                {user ? (
                                    <Link
                                        href="/dashboard"
                                        className="block px-4 py-3.5 text-base font-semibold bg-primary text-black rounded-xl text-center"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="block px-4 py-3.5 text-base font-semibold bg-white text-black rounded-xl text-center"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
