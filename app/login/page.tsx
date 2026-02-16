"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Globe, Shield, Zap, MessageSquare } from "lucide-react";

export default function LoginPage() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    )
}

function LoginForm() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const message = searchParams.get("message");
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

    const handleLogin = async (provider: 'google' | 'discord') => {
        setLoadingProvider(provider);
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setLoadingProvider(null);
            console.error(`${provider} login error:`, error);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center brightness-[0.3]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow delay-700" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-lg px-4"
            >
                <div className="glass-card p-10 md:p-14 rounded-[3rem] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Shield className="w-32 h-32 text-white" />
                    </div>

                    <div className="space-y-12 relative z-10">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center shadow-glow-primary mb-8"
                            >
                                <LogIn className="h-8 w-8 text-black" />
                            </motion.div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                                Access the <span className="text-primary italic">Atelier</span>
                            </h1>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Join our exclusive ecosystem of high-performance digital craftsmanship.
                            </p>
                        </div>

                        <AnimatePresence>
                            {(error || message) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className={`p-4 rounded-2xl text-sm font-bold flex items-center gap-3 border ${error ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-green-500/10 border-green-500/20 text-green-500"
                                        }`}
                                >
                                    <div className={`h-2 w-2 rounded-full animate-pulse ${error ? "bg-red-500" : "bg-green-500"}`} />
                                    {error || message}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button
                                onClick={() => handleLogin('google')}
                                disabled={!!loadingProvider}
                                className="h-16 rounded-2xl bg-white text-black hover:bg-zinc-200 font-bold text-lg shadow-xl hover:scale-105 transition-all group lg:px-8"
                            >
                                {loadingProvider === 'google' ? (
                                    <Zap className="h-6 w-6 animate-spin" />
                                ) : (
                                    <>
                                        <svg className="mr-3 h-6 w-6" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        Google
                                    </>
                                )}
                            </Button>

                            <Button
                                onClick={() => handleLogin('discord')}
                                disabled={!!loadingProvider}
                                className="h-16 rounded-2xl bg-[#5865F2] text-white hover:bg-[#4752C4] font-bold text-lg shadow-xl hover:scale-105 transition-all group lg:px-8"
                            >
                                {loadingProvider === 'discord' ? (
                                    <Zap className="h-6 w-6 animate-spin" />
                                ) : (
                                    <>
                                        <MessageSquare className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                                        Discord
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600">
                            <span className="flex items-center gap-2 hover:text-zinc-400 transition-colors cursor-default">
                                <Globe className="w-3 h-3" /> Global Infrastructure
                            </span>
                            <span className="flex items-center gap-2 hover:text-zinc-400 transition-colors cursor-default">
                                <Shield className="w-3 h-3" /> Secure Handshake
                            </span>
                        </div>
                    </div>
                </div>

                <p className="mt-12 text-center text-zinc-600 text-xs font-bold uppercase tracking-widest leading-relaxed">
                    By accessing the portal, you agree to our <br className="sm:hidden" />
                    <a href="/terms" className="text-zinc-400 hover:text-primary transition-colors underline underline-offset-4 decoration-primary/20">Terms</a> and <a href="/privacy" className="text-zinc-400 hover:text-primary transition-colors underline underline-offset-4 decoration-primary/20">Privacy Principles</a>
                </p>
            </motion.div>
        </div>
    );
}
