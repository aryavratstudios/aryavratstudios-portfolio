"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, [supabase]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 pointer-events-none"
        >
            <div className="pointer-events-auto w-full max-w-5xl glass-card rounded-full px-6 py-3 flex items-center justify-between border border-white/10 shadow-lg backdrop-blur-xl bg-black/40">
                <Link href="/" className="font-bold text-xl tracking-tighter flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-black text-lg font-bold">A</span>
                    </div>
                    <span>Aryavrat<span className="text-primary">.</span></span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {["Services", "Work", "About"].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hover:scale-105 transform duration-200"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <Button asChild variant="default" className="rounded-full px-6 font-semibold bg-primary text-black hover:bg-primary/90 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                    ) : (
                        <Button asChild variant="default" className="rounded-full px-6 font-semibold bg-white text-black hover:bg-zinc-200">
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}
