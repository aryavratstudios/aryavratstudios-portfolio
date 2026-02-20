"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail } from "lucide-react";
import { triggerSuccessConfetti } from "@/lib/confetti";

export function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");

        // Simulate API call
        await new Promise(r => setTimeout(r, 1500));

        setStatus("success");
        triggerSuccessConfetti();
        setEmail("");
    };

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <div className="glass-card p-12 md:p-20 rounded-[3rem] border border-white/5 bg-zinc-900/40 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto space-y-8"
                    >
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto border border-primary/20 shadow-glow-primary-small">
                            <Mail size={32} />
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
                                Get The <span className="text-primary">Insider Scoop</span>
                            </h2>
                            <p className="text-zinc-500 text-lg">Join 2,000+ founders receiving our weekly breakdown on tech, design, and growth.</p>
                        </div>

                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-500 font-bold flex items-center justify-center gap-3"
                                >
                                    <CheckCircle2 size={24} />
                                    Welcome To The Empire!
                                </motion.div>
                            ) : (
                                <motion.form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                                >
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 h-14 rounded-2xl bg-black/40 border border-white/10 px-6 font-bold text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-zinc-700"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="h-14 px-8 rounded-2xl bg-primary text-black font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        {status === 'loading' ? "Sending..." : <>Join Now <Send size={18} /></>}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">No SPAM. Just Pure Value. Unsubscribe Anytime.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
