"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, Rocket, Check } from "lucide-react";

export function PricingCalculator() {
    const [pages, setPages] = useState(3);
    const [features, setFeatures] = useState<string[]>([]);

    const basePrice = 500;
    const pricePerPage = 150;

    const extraFeatures = [
        { id: 'auth', label: 'User Authentication', price: 300, icon: Shield },
        { id: 'cms', label: 'Content Management', price: 400, icon: Zap },
        { id: 'ai', label: 'AI Integration', price: 600, icon: Rocket },
    ];

    const totalPrice = useMemo(() => {
        const featureTotal = features.reduce((acc, featId) => {
            const feat = extraFeatures.find(f => f.id === featId);
            return acc + (feat?.price || 0);
        }, 0);
        return basePrice + (pages * pricePerPage) + featureTotal;
    }, [pages, features]);

    const toggleFeature = (id: string) => {
        setFeatures(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    return (
        <div className="glass-card p-8 rounded-[3rem] border border-white/5 bg-zinc-900/60 max-w-4xl mx-auto my-20">
            <h2 className="text-2xl font-black mb-8 uppercase tracking-widest text-center">Estimate Your <span className="text-primary">Investment</span></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-black text-white uppercase tracking-widest">Number of Pages</label>
                            <span className="text-primary font-black text-xl">{pages}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={pages}
                            onChange={(e) => setPages(parseInt(e.target.value))}
                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-black text-white uppercase tracking-widest block pl-1">Power Ups</label>
                        <div className="space-y-3">
                            {extraFeatures.map((feat) => (
                                <button
                                    key={feat.id}
                                    onClick={() => toggleFeature(feat.id)}
                                    className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between group ${features.includes(feat.id) ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                                >
                                    <div className="flex items-center gap-3 text-left">
                                        <div className={`p-2 rounded-lg transition-colors ${features.includes(feat.id) ? 'bg-primary text-black' : 'bg-zinc-800 text-zinc-400 group-hover:text-white'}`}>
                                            <feat.icon size={18} />
                                        </div>
                                        <span className={`font-bold text-sm ${features.includes(feat.id) ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>{feat.label}</span>
                                    </div>
                                    <div className={`h-6 w-6 rounded-full border flex items-center justify-center transition-all ${features.includes(feat.id) ? 'bg-primary border-primary' : 'border-white/20'}`}>
                                        {features.includes(feat.id) && <Check size={14} className="text-black font-black" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative p-10 rounded-[2rem] bg-black/40 border border-white/5 text-center overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] animate-pulse"></div>
                    <span className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Estimated Total</span>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={totalPrice}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-6xl font-black text-white tracking-tighter"
                        >
                            <span className="text-primary mr-2">$</span>{totalPrice}
                        </motion.div>
                    </AnimatePresence>
                    <p className="text-[10px] text-zinc-500 mt-6 font-medium leading-relaxed uppercase tracking-widest px-8">Custom quote required for exact pricing based on complexity.</p>
                </div>
            </div>
        </div>
    );
}
