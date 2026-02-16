"use client";

import { motion } from "framer-motion";
import { User, Target, Heart, Award, Sparkles, MapPin } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="py-24 md:py-32 bg-black min-h-screen relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 rounded-full blur-[150px] -z-10"></div>

            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center mb-32"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                        The Soul of <span className="text-primary italic">Aryavrat</span>
                    </h1>
                    <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed">
                        We are a boutique digital craftsmanship studio dedicated to building extraordinary experiences that transcend the ordinary.
                    </p>
                </motion.div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-40">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
                                <Target className="w-5 h-5" />
                                Our Mission
                            </div>
                            <h2 className="text-4xl font-bold text-white">Engineering Excellence for Ambitions.</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Our mission is simple: To empower visionaries with the technology and design they need to lead their industries. We don't just write code; we architect futures.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { icon: Award, label: "Quality First", desc: "No compromises on craft." },
                                { icon: Sparkles, label: "Innovation", desc: "Pushing digital boundaries." },
                                { icon: Heart, label: "Client Centric", desc: "Your vision, our priority." },
                                { icon: MapPin, label: "Global Reach", desc: "Borderless studio model." }
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center gap-2 text-white font-bold">
                                        <item.icon className="w-4 h-4 text-primary" />
                                        {item.label}
                                    </div>
                                    <p className="text-zinc-500 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative aspect-square"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-[3rem] animate-pulse-slow"></div>
                        <div className="absolute inset-4 border border-white/10 rounded-[2.5rem] bg-zinc-900/50 backdrop-blur-2xl flex items-center justify-center">
                            <div className="text-center space-y-4 px-8">
                                <div className="h-24 w-24 rounded-full bg-primary mx-auto flex items-center justify-center shadow-glow">
                                    <User className="h-12 w-12 text-black" />
                                </div>
                                <h3 className="text-2xl font-bold">Modern Craftsmanship</h3>
                                <p className="text-zinc-500">Every project is hand-crafted with precision and passion in our digital workshop.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Final Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-center bg-zinc-900 border border-white/10 rounded-[4rem] p-16 md:p-24 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none"></div>
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold">Let's build something <span className="text-primary italic">Spectacular</span>.</h2>
                        <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
                            Whether you're starting from scratch or scaling the heights, we're here to elevate your digital presence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="mailto:hello@aryavrat.studio" className="inline-flex items-center justify-center px-10 py-5 bg-primary text-black font-bold text-lg rounded-full shadow-glow transition-all hover:scale-105 active:scale-95">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
