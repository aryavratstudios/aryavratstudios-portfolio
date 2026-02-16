"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
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
                            Terms of <span className="text-primary italic">Service</span>
                        </h1>
                        <p className="text-zinc-500 text-lg">Last Updated: February 16, 2026</p>
                    </div>

                    <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 space-y-8 bg-zinc-900/20 backdrop-blur-xl">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-primary text-sm font-black w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">01</span>
                                Acceptance of Terms
                            </h2>
                            <p className="text-zinc-400 leading-relaxed">
                                By accessing or using the Aryavrat Studio Portal, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-primary text-sm font-black w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">02</span>
                                Description of Service
                            </h2>
                            <p className="text-zinc-400 leading-relaxed">
                                Aryavrat Studio provides a range of digital services including web development, UI/UX design, video editing, and marketing solutions. Our portal facilitates project management, client communication, and order fulfillment.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-primary text-sm font-black w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">03</span>
                                Client Responsibilities
                            </h2>
                            <p className="text-zinc-400 leading-relaxed">
                                Clients are responsible for providing accurate project requirements, timely feedback, and necessary assets for project completion. Communication regarding orders must primarily occur through our portal or designated Discord tickets.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-primary text-sm font-black w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">04</span>
                                Payments and Refunds
                            </h2>
                            <p className="text-zinc-400 leading-relaxed">
                                All payments are handled as per the agreed project quote. Due to the personalized nature of our creative services, refunds are generally not provided once work has commenced, unless otherwise specified in an individual project agreement.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="text-primary text-sm font-black w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">05</span>
                                Intellectual Property
                            </h2>
                            <p className="text-zinc-400 leading-relaxed">
                                Upon full payment, the client receives ownership of the final delivered assets. Aryavrat Studio retains the right to display the completed work in its portfolio and marketing materials.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
