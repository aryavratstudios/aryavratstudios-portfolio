"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement contact form submission
        console.log("Contact form:", formData);
    };

    return (
        <div className="py-16 md:py-20 bg-black min-h-screen">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        Get in <span className="text-primary">Touch</span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card rounded-3xl p-8 border border-white/5 bg-white/[0.02]"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="text-sm font-semibold text-zinc-400 mb-2 block">Your Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-zinc-400 mb-2 block">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-zinc-400 mb-2 block">Subject</label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                    placeholder="Project Inquiry"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-zinc-400 mb-2 block">Message</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                                    placeholder="Tell us about your project..."
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 font-semibold">
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                            </Button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="glass-card rounded-3xl p-8 border border-white/5 bg-white/[0.02]">
                            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">Email</h3>
                                        <a href="mailto:hello@aryavrathq.com" className="text-zinc-400 hover:text-primary transition-colors">
                                            hello@aryavrathq.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                                        <MessageSquare className="h-5 w-5 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">Discord</h3>
                                        <p className="text-zinc-400">Join our community server</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-5 w-5 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">Phone</h3>
                                        <p className="text-zinc-400">Available on request</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card rounded-3xl p-8 border border-primary/20 bg-primary/5">
                            <h3 className="text-xl font-bold text-white mb-3">Quick Response</h3>
                            <p className="text-zinc-300 text-sm mb-4">
                                We typically respond within 24 hours during business days. For urgent inquiries, please mention "URGENT" in your subject line.
                            </p>
                            <p className="text-zinc-400 text-xs">
                                Business Hours: Mon-Fri, 9:00 AM - 6:00 PM IST
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
