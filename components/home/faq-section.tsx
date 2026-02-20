"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
    { q: "How long does a typical project take?", a: "Most projects take between 4-6 weeks from initial consultation to launch, depending on complexity and response times." },
    { q: "What technologies do you use?", a: "We specialize in modern web technologies including Next.js, React, Supabase, and Tailwind CSS to build fast, scalable apps." },
    { q: "Do you offer post-launch support?", a: "Yes, we provide ongoing maintenance and support packages to ensure your platform stays healthy and performant." },
    { q: "Can you help with app design too?", a: "Absolutely. Our design-first approach ensures that everything we build is not only functional but also visually stunning." },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4 border border-accent/20">
                        <HelpCircle size={24} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Everything You <span className="text-accent">Need To Know</span></h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="glass-card rounded-[2rem] border border-white/5 bg-zinc-900/40 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full p-8 flex items-center justify-between text-left group"
                            >
                                <span className={`text-lg font-bold transition-colors ${openIndex === i ? 'text-accent' : 'text-white group-hover:text-accent/70'}`}>{faq.q}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    className="text-zinc-600"
                                >
                                    <ChevronDown size={24} />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-8 pb-8 text-zinc-500 leading-relaxed font-medium">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
