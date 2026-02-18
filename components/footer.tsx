"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Github, Twitter, Linkedin, Youtube, Instagram, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        
        const formData = new FormData();
        formData.append("email", email);
        
        startTransition(async () => {
            const result = await subscribeToNewsletter(formData);
            if (result.success) {
                setMessage({ type: 'success', text: result.message || "Successfully subscribed!" });
                setEmail("");
            } else {
                setMessage({ type: 'error', text: result.error || "Failed to subscribe" });
            }
        });
    };

    return (
        <footer className="border-t border-white/5 bg-black">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
                    {/* Newsletter Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/20">
                                <span className="text-primary font-black text-lg">A</span>
                            </div>
                            <span className="text-xl font-black text-white">AryavratHQ</span>
                        </div>
                        <h3 className="text-sm font-bold text-white mb-2">Keep up to date</h3>
                        <p className="text-sm text-zinc-500 mb-6">Join our newsletter for regular updates. No spam ever.</p>

                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="flex-1 h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                required
                                disabled={isPending}
                            />
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="h-12 px-6 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all disabled:opacity-50 whitespace-nowrap"
                            >
                                {isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Subscribe"
                                )}
                            </Button>
                        </form>
                        {message && (
                            <div className={`mt-3 flex items-center gap-2 text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {message.type === 'success' ? (
                                    <CheckCircle2 className="h-4 w-4" />
                                ) : null}
                                {message.text}
                            </div>
                        )}
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-6">Services</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/services#thumbnails" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    Thumbnail Design
                                </Link>
                            </li>
                            <li>
                                <Link href="/services#video" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    Video Editing
                                </Link>
                            </li>
                            <li>
                                <Link href="/services#branding" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    Brand Identity
                                </Link>
                            </li>
                            <li>
                                <Link href="/services#web" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    Web Development
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-6">Resources</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/work" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Explore Column */}
                    <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-6">Explore</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/work" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    Showcase
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/new" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    Get Started
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-6">Company</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-sm text-zinc-500 hover:text-primary transition-colors inline-flex items-center gap-1">
                                    Careers
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">HIRING</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/support" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    Support
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-zinc-500">
                        Copyright © {new Date().getFullYear()} AryavratHQ, trading as <span className="text-primary font-semibold">AryavratHQ</span>.
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/aryavrathq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-9 w-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all"
                            aria-label="GitHub"
                        >
                            <Github className="h-4 w-4" />
                        </a>
                        <a
                            href="https://twitter.com/aryavrathq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-9 w-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all"
                            aria-label="Twitter"
                        >
                            <Twitter className="h-4 w-4" />
                        </a>
                        <a
                            href="https://linkedin.com/company/aryavrathq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-9 w-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-4 w-4" />
                        </a>
                        <a
                            href="https://youtube.com/@aryavrathq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-9 w-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all"
                            aria-label="YouTube"
                        >
                            <Youtube className="h-4 w-4" />
                        </a>
                        <a
                            href="https://instagram.com/aryavrathq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-9 w-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all"
                            aria-label="Instagram"
                        >
                            <Instagram className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
