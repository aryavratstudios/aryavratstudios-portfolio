"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Shield, Star, Globe, Cpu, MessageSquare, Workflow, Users, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/logo";

const testimonials = [
    {
        name: "Alex Chen",
        role: "Tech Founder",
        company: "Nexus Labs",
        avatar: "AC",
        content: "Aryavrat transformed our vision into a stunning digital product. Their attention to detail and technical expertise is unmatched. Our conversion rates increased by 300% after the redesign.",
        rating: 5
    },
    {
        name: "Sarah Mitchell",
        role: "Content Creator",
        company: "Mitchell Media",
        avatar: "SM",
        content: "The thumbnail designs doubled my click-through rates. Professional, creative, and incredibly responsive. They truly understand what makes content viral.",
        rating: 5
    },
    {
        name: "David Park",
        role: "CEO",
        company: "Quantum Ventures",
        avatar: "DP",
        content: "Exceptional web development and design work. They delivered our SaaS platform ahead of schedule and the quality exceeded expectations. Highly recommend!",
        rating: 5
    }
];

const processSteps = [
    {
        number: "01",
        title: "Discovery",
        description: "We dive deep into understanding your goals, audience, and competitive landscape to build a strategic foundation.",
        icon: Rocket
    },
    {
        number: "02",
        title: "Design",
        description: "Our team crafts pixel-perfect mockups and prototypes, ensuring every detail aligns with your brand vision.",
        icon: Star
    },
    {
        number: "03",
        title: "Development",
        description: "Using cutting-edge technologies, we bring designs to life with clean, performant, scalable code.",
        icon: Cpu
    },
    {
        number: "04",
        title: "Launch",
        description: "We deploy your project with zero downtime and provide ongoing support to ensure continued success.",
        icon: Zap
    }
];

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] overflow-hidden">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center py-16 md:py-24 text-center px-4 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-60 blur-3xl animate-pulse-slow"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 max-w-4xl mx-auto z-10"
                >
                    <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <span className="flex h-2 w-2 rounded-full bg-white mr-2 animate-pulse"></span>
                        Accepting New Clients
                    </div>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="mb-8"
                    >
                        <Logo size={120} showGlow className="mx-auto" />
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-display tracking-tight leading-tight text-white pb-4">
                        <span className="block mb-2 font-light text-white/90">Build Your</span>
                        <span className="font-black text-primary glow-text">Digital Empire</span>
                    </h1>

                    <p className="mx-auto max-w-[700px] text-zinc-400 md:text-lg lg:text-xl leading-relaxed">
                        We craft high-performance digital experiences. Premium design, robust engineering, and strategic growth for ambitious brands.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                    >
                        <Button asChild size="lg" className="h-12 px-8 text-base font-semibold shadow-glow-primary hover:scale-105 transition-all duration-300 bg-primary text-black border-none">
                            <Link href="/login">
                                Start Project <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base glass border-white/10 hover:bg-white/10 transition-all duration-300">
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
                    <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">Explore</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
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
                        <h2 className="text-4xl md:text-6xl font-display tracking-tighter uppercase">
                            <span className="font-light opacity-50 block text-2xl md:text-3xl tracking-[0.2em] mb-2">Why Choose</span>
                            <span className="font-black">Aryavrat?</span>
                        </h2>
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
                                className="glass-card p-8 rounded-[32px] border border-foreground/5 hover:border-primary/50 transition-all duration-500 group relative overflow-hidden"
                            >
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
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

            {/* Testimonials Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
                            <MessageSquare className="w-4 h-4" />
                            Testimonials
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display tracking-tighter uppercase">
                            <span className="font-light opacity-50 block text-2xl md:text-3xl tracking-[0.2em] mb-2">What Clients</span>
                            <span className="font-black">Say About Us</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="glass-card p-8 rounded-[32px] border border-white/5 hover:border-primary/30 transition-all duration-300 group"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                <p className="text-zinc-300 leading-relaxed mb-8">
                                    "{testimonial.content}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-bold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{testimonial.name}</div>
                                        <div className="text-sm text-zinc-500">{testimonial.role}, {testimonial.company}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 bg-black/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
                            <Workflow className="w-4 h-4" />
                            Our Process
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display tracking-tighter uppercase">
                            <span className="font-light opacity-50 block text-2xl md:text-3xl tracking-[0.2em] mb-2">How We</span>
                            <span className="font-black">Deliver Excellence</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <div className="glass-card p-6 rounded-3xl border border-white/5 hover:border-accent/30 transition-all duration-300 h-full">
                                    <div className="text-6xl font-black text-white/5 mb-4 absolute top-4 right-4">{step.number}</div>
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <step.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent transition-colors">{step.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed text-sm">
                                        {step.description}
                                    </p>
                                </div>
                                {i < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                                        <ArrowRight className="w-6 h-6 text-white/20" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 -z-10"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-slow delay-700"></div>

                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="glass-card p-12 md:p-20 rounded-[3rem] border border-primary/20 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10"></div>

                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <Logo size={80} showGlow />
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6">
                            <span className="font-light text-white/70">Ready to</span>{" "}
                            <span className="font-black text-primary glow-text">Start?</span>
                        </h2>

                        <p className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed">
                            Join hundreds of satisfied clients who have transformed their digital presence with Aryavrat. Let's build something extraordinary together.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Button asChild size="lg" className="h-14 px-10 text-lg font-bold shadow-glow-primary hover:scale-105 transition-all duration-300 bg-primary text-black border-none rounded-full">
                                <Link href="/dashboard/new">
                                    Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg font-semibold glass border-white/10 hover:bg-white/10 transition-all duration-300 rounded-full">
                                <Link href="/contact">
                                    Talk to Us
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                            className="mt-12 flex items-center justify-center gap-8 text-sm text-zinc-500"
                        >
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-accent" />
                                <span>No commitment required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-accent" />
                                <span>Free consultation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-accent" />
                                <span>Fast response</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
