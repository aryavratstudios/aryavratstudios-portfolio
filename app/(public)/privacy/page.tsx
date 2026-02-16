"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
    return (
        <div className="py-24 md:py-32 bg-black min-h-screen relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                            Privacy <span className="text-primary italic">Policy</span>
                        </h1>
                        <p className="text-zinc-500 text-lg">Last Updated: February 16, 2026</p>
                    </div>

                    <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 space-y-8 bg-zinc-900/20 backdrop-blur-xl">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-primary text-sm font-black w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">01</span>
                                Information Collection
                            </h2>
                            <p className="text-zinc-400 leading-relaxed">
                                We collect information you provide directly to us when you create an account, place an order, or communicate with our team. This may include your name, email address, and project specifications.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-primary text-sm font-black w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">02</span>
                                Use of Information
                            </h2>
                            <p className="text-zinc-400 leading-relaxed">
                                We use your info to manage your account, fulfill your orders, and provide customer support. We may also use your contact information to send you updates about your project.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-primary text-sm font-black w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">03</span>
                                Data Security
                            </h2>
                            <p className="text-zinc-400 leading-relaxed">
                                We implement industry-standard security measures to protect your personal data and project files. However, no method of transmission over the internet is 100% secure.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-primary text-sm font-black w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">04</span>
                                Third-Party Services
                            </h2>
                            <p className="text-zinc-400 leading-relaxed">
                                We use Supabase for authentication and database management. Your data is handled in accordance with their high security standards. We do not sell your personal information to third parties.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
