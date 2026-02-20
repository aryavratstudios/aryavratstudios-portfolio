"use client";

import { motion } from "framer-motion";
import { Shield, FileText, Check } from "lucide-react";

export function ServiceAgreement({ date }: { date: string }) {
    return (
        <div className="space-y-8 text-zinc-300 text-sm leading-relaxed p-6 bg-black/40 rounded-3xl border border-white/5 max-h-[500px] overflow-y-auto no-scrollbar">
            <div className="flex items-center gap-3 border-b border-white/10 pb-6 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    <FileText className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter">International Client Service Agreement</h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Legal Document | Standard Production Terms</p>
                </div>
            </div>

            <section className="space-y-4">
                <p>This Service Agreement ("Agreement") is entered into on <strong>{date}</strong>, by and between:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Client</p>
                        <p className="text-white font-bold">[Authenticated Client]</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Studio</p>
                        <p className="text-white font-bold">Aryavrat Studios</p>
                    </div>
                </div>
            </section>

            <section className="space-y-2">
                <h3 className="text-white font-black uppercase text-xs tracking-widest">1. Scope of Work</h3>
                <p>The Studio agrees to provide high-fidelity digital craftsmanship including but not limited to Thumbnail Design, Video Editing, Content Management, and IT Support as specified in the project order.</p>
                <p className="text-zinc-500 text-[11px]">Any services not specifically listed are considered outside the scope and require separate negotiation.</p>
            </section>

            <section className="space-y-2">
                <h3 className="text-white font-black uppercase text-xs tracking-widest">2. Payment Terms</h3>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Work commences only upon receipt of agreed upfront investment.</li>
                    <li>All payments are non-refundable once production has initialized.</li>
                    <li>Client is responsible for all international transaction fees.</li>
                </ul>
            </section>

            <section className="space-y-2">
                <h3 className="text-white font-black uppercase text-xs tracking-widest">3. Timeline & Delivery</h3>
                <p>Delivery dates are estimates. Delays in client feedback or material submission will automatically extend the production timeline. The Studio is not liable for delays caused by client unavailability.</p>
            </section>

            <section className="space-y-2">
                <h3 className="text-white font-black uppercase text-xs tracking-widest">4. Revisions</h3>
                <p>Standard orders include specific revision rounds as defined in the service tier. Major conceptual changes after the start of work will incur additional fees.</p>
            </section>

            <section className="space-y-2">
                <h3 className="text-white font-black uppercase text-xs tracking-widest">5. Intellectual Property</h3>
                <p>Full ownership transfers to the Client ONLY after 100% of the payment is received. The Studio retains the right to showcase work in professional portfolios.</p>
            </section>

            <section className="space-y-2">
                <h3 className="text-white font-black uppercase text-xs tracking-widest">10. Governing Law</h3>
                <p>This Agreement shall be governed by and interpreted in accordance with the laws of <strong>India</strong>, without regard to conflict of law principles.</p>
            </section>

            <div className="pt-8 border-t border-white/10 mt-8">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/20">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Check className="w-5 h-5" />
                    </div>
                    <p className="text-[11px] font-bold text-white uppercase tracking-tight">
                        By proceeding with payment, you electronically sign and bind yourself to this agreement.
                    </p>
                </div>
            </div>
        </div>
    );
}
