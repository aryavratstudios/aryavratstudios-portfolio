"use client";

import { motion } from "framer-motion";
import { Rocket, Users, Target, Award, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="py-16 md:py-20 bg-black min-h-screen relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10"></div>

            <div className="container mx-auto px-4 max-w-6xl">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
                        <Sparkles className="w-4 h-4" />
                        About Us
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                        Crafting Digital Excellence
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        We're a team of passionate creators, designers, and developers dedicated to transforming ideas into exceptional digital experiences.
                    </p>
                </motion.div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 rounded-3xl border border-white/10"
                    >
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-5">
                            <Target className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            To empower businesses with cutting-edge digital solutions that drive growth, enhance user experiences, and create lasting impact in the digital landscape.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 rounded-3xl border border-white/10"
                    >
                        <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center mb-5">
                            <Rocket className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            To become the go-to partner for businesses seeking innovative, scalable, and beautiful digital solutions that stand the test of time.
                        </p>
                    </motion.div>
                </div>

                {/* Core Values */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                        What Drives Us
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Heart,
                                title: "Passion",
                                desc: "We love what we do and it shows in every pixel, every line of code.",
                                color: "primary"
                            },
                            {
                                icon: Users,
                                title: "Collaboration",
                                desc: "Your success is our success. We work closely with you every step of the way.",
                                color: "secondary"
                            },
                            {
                                icon: Award,
                                title: "Excellence",
                                desc: "We don't settle for good enough. We strive for exceptional in everything we create.",
                                color: "accent"
                            }
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group"
                            >
                                <div className={`w-10 h-10 bg-${value.color}/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <value.icon className={`w-5 h-5 text-${value.color}`} />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="glass-card p-10 md:p-12 rounded-3xl border border-primary/20 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Build Something Amazing?
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
                        Let's collaborate and bring your vision to life with innovative design and powerful technology.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-glow-primary">
                            <Link href="/login">Start Your Project</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-white/10 hover:bg-white/5">
                            <Link href="/work">View Our Work</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
