"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Globe, Cpu, Layout, Video, Megaphone, ArrowRight } from "lucide-react";
import Link from "next/link";

const envServices = [
    {
        title: "Web Development",
        description: "Custom, high-performance web applications built with the latest technologies like Next.js, React, and Supabase.",
        icon: Globe,
        features: ["E-commerce", "SaaS Platforms", "Custom CMS", "Landing Pages"],
        color: "from-blue-500/20 to-cyan-500/20"
    },
    {
        title: "UI/UX Design",
        description: "User-centric design that not only looks beautiful but also drives conversions and provides a seamless experience.",
        icon: Layout,
        features: ["Prototyping", "Design Systems", "Mobile App Design", "User Research"],
        color: "from-purple-500/20 to-pink-500/20"
    },
    {
        title: "Video Editing",
        description: "Professional video editing for content creators, agencies, and brands. High-quality production and storytelling.",
        icon: Video,
        features: ["YouTube Editing", "Short-form Content", "Color Grading", "Motion Graphics"],
        color: "from-orange-500/20 to-red-500/20"
    },
    {
        title: "Digital Marketing",
        description: "Strategic marketing campaigns designed to scale your business and reach your target audience effectively.",
        icon: Megaphone,
        features: ["SEO Optimization", "Social Media", "Content Strategy", "PPC Campaigns"],
        color: "from-green-500/20 to-emerald-500/20"
    },
    {
        title: "AI Solutions",
        description: "Integrate cutting-edge AI features into your existing platforms to automate tasks and enhance user intelligence.",
        icon: Cpu,
        features: ["Chatbots", "LLM Integration", "Predictive Analytics", "Automation"],
        color: "from-yellow-500/20 to-amber-500/20"
    },
    {
        title: "Consulting",
        description: "Expert technical and strategic consulting to help you navigate the ever-evolving digital landscape.",
        icon: Zap,
        features: ["Tech Audit", "Infrastructure Scale", "Growth Hacking", "Product Strategy"],
        color: "from-primary/20 to-primary/5"
    }
];

export default function ServicesPage() {
    return (
        <div className="py-24 md:py-32 bg-black min-h-screen relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 space-y-4"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Our <span className="text-primary">Services</span></h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        We provide end-to-end digital solutions tailored to the unique needs of ambitious businesses and individuals.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {envServices.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="h-full"
                        >
                            <div className="glass-card h-full p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-300 flex flex-col group">
                                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className="h-8 w-8 text-primary shadow-glow" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                                <p className="text-zinc-400 mb-6 flex-grow leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-2 mb-8 flex-shrink-0">
                                    {service.features.map(feature => (
                                        <li key={feature} className="flex items-center text-sm text-zinc-300">
                                            <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild variant="outline" className="w-full rounded-xl border-white/10 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300">
                                    <Link href="/login" className="flex items-center justify-center">
                                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-24 p-12 glass-card rounded-[3rem] border border-primary/20 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-primary/5 -z-10 animate-pulse-slow"></div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 italic">Ready to transform your vision into reality?</h2>
                    <p className="text-zinc-400 max-w-xl mx-auto mb-10 text-lg">
                        Join our exclusive client network and get direct access to premium digital craftsmanship.
                    </p>
                    <Button asChild size="lg" className="rounded-full px-12 h-14 text-lg font-bold shadow-glow-primary transform hover:scale-105 transition-all">
                        <Link href="/login">Get Started Now</Link>
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}

function CheckCircle2({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}
