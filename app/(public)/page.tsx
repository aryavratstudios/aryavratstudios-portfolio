"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Shield, Star, Globe, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] overflow-hidden">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center py-24 md:py-40 text-center px-4 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-60 blur-3xl animate-pulse-slow"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 max-w-4xl mx-auto z-10"
                >
                    <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        Accepting New Clients
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50 pb-2">
                        Build Your <br className="hidden md:block" />
                        <span className="text-primary glow-text">Digital Empire</span>
                    </h1>

                    <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-xl/relaxed leading-relaxed">
                        We craft high-performance digital experiences. Premium design, robust engineering, and strategic growth for ambitious brands.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                    >
                        <Button asChild size="lg" className="h-14 px-8 text-lg font-semibold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:-translate-y-1">
                            <Link href="/login">
                                Start Project <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg glass border-white/10 hover:bg-white/10 transition-all duration-300">
                            <Link href="/work">View Portfolio</Link>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Explore</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent"></div>
                </motion.div>
            </section>

            {/* Stats/Social Proof */}
            <section className="py-10 border-y border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Projects Delivered", value: "150+" },
                            { label: "Client Satisfaction", value: "100%" },
                            { label: "Years Experience", value: "5+" },
                            { label: "Support Available", value: "24/7" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="space-y-1"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                                <div className="text-sm text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">Why Choose Aryavrat?</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">We don't just build websites; we build business solutions that drive growth and engagement.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed. We ensure your platform loads instantly, keeping users engaged." },
                            { icon: Shield, title: "Enterprise Security", desc: "Bank-grade security protocols to keep your data and your clients' data safe." },
                            { icon: CheckCircle2, title: "Pixel Perfect", desc: "Obsessive attention to detail. Every pixel is placed with purpose and precision." },
                            { icon: Star, title: "Premium Strategy", desc: "We align our development with your business goals for maximum ROI." },
                            { icon: Globe, title: "Global Scale", desc: "Built to scale. From your first user to your millionth, we've got you covered." },
                            { icon: Cpu, title: "Cutting-Edge Tech", desc: "Leveraging the latest frameworks like Next.js 14 and Supabase for future-proof apps." }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="glass-card p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 group"
                            >
                                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
