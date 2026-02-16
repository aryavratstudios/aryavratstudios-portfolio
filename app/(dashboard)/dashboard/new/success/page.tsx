"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, MessageSquare, ExternalLink, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const ticketUrl = searchParams.get("ticketUrl");
    const inviteUrl = "https://discord.gg/aUZuXcZvYa"; // Static invite URL from env

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8 border border-primary/30 shadow-glow-primary"
            >
                <CheckCircle className="w-12 h-12 text-primary" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-4 max-w-xl"
            >
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                    Order <span className="text-primary">Launched!</span>
                </h1>
                <p className="text-zinc-500 text-lg">
                    Your project has been successfully initialized in our system. We have automated a dedicated Discord ticket for high-priority support.
                </p>

                <div className="grid gap-4 mt-12">
                    {ticketUrl && (
                        <Button asChild size="lg" className="h-16 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-lg shadow-xl hover:scale-105 transition-all">
                            <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
                                <MessageSquare className="mr-3 h-6 w-6" />
                                Open Discord Ticket
                            </a>
                        </Button>
                    )}

                    <Button asChild variant="outline" size="lg" className="h-16 rounded-2xl border-white/10 glass hover:bg-white/10 font-bold text-lg hover:scale-105 transition-all">
                        <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-3 h-6 w-6" />
                            Join Discord Server
                        </a>
                    </Button>

                    <Link href="/dashboard" className="inline-flex items-center justify-center text-zinc-500 hover:text-white transition-all mt-4 font-medium group">
                        Back to Dashboard <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>

            {/* Ambient Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-40"></div>
            </div>
        </div>
    );
}
