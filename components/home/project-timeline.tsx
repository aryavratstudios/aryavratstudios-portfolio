"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

const steps = [
    { title: "Initial Consultation", date: "Week 0", status: "completed", desc: "Understanding goals and project scope." },
    { title: "Strategic Design", date: "Week 1", status: "completed", desc: "Crafting a unique visual language." },
    { title: "Technical Architecture", date: "Week 2", status: "active", desc: "Building the robust backend foundation." },
    { title: "Frontend Development", date: "Week 3", status: "pending", desc: "Responsive, high-performance UI." },
    { title: "Testing & QA", date: "Week 4", status: "pending", desc: "Ensuring pixel-perfect results." },
    { title: "Launch & Support", date: "Week 5", status: "pending", desc: "Zero-downtime deployment." },
];

export function ProjectTimeline() {
    return (
        <div className="max-w-3xl mx-auto py-20 px-4">
            <h2 className="text-3xl font-black mb-12 uppercase tracking-tighter text-center">Production <span className="text-primary">Timeline</span></h2>
            <div className="relative space-y-8">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>

                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="relative pl-12"
                    >
                        <div className={`absolute left-0 top-1 p-1 rounded-full border transition-all duration-500 ${step.status === 'completed' ? 'bg-primary border-primary text-black' : step.status === 'active' ? 'bg-black border-primary text-primary animate-pulse shadow-glow-primary' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}>
                            {step.status === 'completed' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                        </div>
                        <div className="glass-card p-6 rounded-2xl border border-white/5 bg-zinc-900/40 hover:border-primary/30 transition-all">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{step.date}</span>
                            <h3 className="text-xl font-bold text-white mt-1 uppercase">{step.title}</h3>
                            <p className="text-zinc-500 text-sm mt-2">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
