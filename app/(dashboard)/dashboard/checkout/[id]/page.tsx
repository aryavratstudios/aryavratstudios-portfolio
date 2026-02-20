"use client";
import { motion, AnimatePresence } from "framer-motion";

import { CreditCard, ShieldCheck, Zap, ArrowLeft, Check, MessageSquare, ExternalLink, ArrowRight, Tag, Info, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { completePayment, validateCoupon } from "../actions";
import { supabase } from "@/lib/supabase/client";
import { ServiceAgreement } from "@/components/checkout/service-agreement";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
    const params = useParams();
    const orderId = params.id as string;
    const [isProcessing, setIsProcessing] = useState(false);
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [couponCode, setCouponCode] = useState("");
    const [couponLoading, setCouponLoading] = useState(false);
    const [couponError, setCouponError] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [result, setResult] = useState<{ ticketUrl?: string; inviteUrl?: string } | null>(null);

    const [hasAcceptedContract, setHasAcceptedContract] = useState(false);
    const [showAgreement, setShowAgreement] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            const { data } = await supabase
                .from("projects")
                .select("*")
                .eq("id", orderId)
                .single();
            setProject(data);
            setLoading(false);
        };
        fetchProject();
    }, [orderId]);

    const basePrice = Number(project?.price) || 35;
    const discountAmount = appliedCoupon ? (basePrice * appliedCoupon.discountPercent) / 100 : 0;
    const total = basePrice - discountAmount;

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setCouponLoading(true);
        setCouponError("");
        try {
            const res = await validateCoupon(couponCode);
            if (res.success) {
                setAppliedCoupon(res);
                setCouponCode("");
            } else {
                setCouponError(res.message || "Invalid coupon");
            }
        } catch (error) {
            setCouponError("Error validating coupon");
        } finally {
            setCouponLoading(false);
        }
    };

    const handlePay = async () => {
        if (!hasAcceptedContract) {
            setCouponError("You must accept the Service Agreement to proceed.");
            return;
        }
        setIsProcessing(true);
        try {
            const res = await completePayment(orderId, appliedCoupon?.id);
            if (res.success) {
                setResult({ ticketUrl: res.ticketUrl, inviteUrl: res.inviteUrl });
            }
        } catch (error) {
            console.error("Payment failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    if (result) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8 border border-primary/30 shadow-glow-primary"
                >
                    <Check className="w-12 h-12 text-primary" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 max-w-xl"
                >
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                        Order <span className="text-primary">Started!</span>
                    </h1>
                    <p className="text-zinc-500 text-lg">
                        Your project is now in production. We have created a dedicated high-priority Discord ticket for your project.
                    </p>

                    <div className="grid gap-4 mt-12 w-full max-w-md mx-auto">
                        {result.ticketUrl && (
                            <Button asChild size="lg" className="h-16 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-lg shadow-xl hover:scale-105 transition-all">
                                <a href={result.ticketUrl} target="_blank" rel="noopener noreferrer">
                                    <MessageSquare className="mr-3 h-6 w-6" />
                                    Open Project Ticket
                                </a>
                            </Button>
                        )}

                        <Button asChild variant="outline" size="lg" className="h-16 rounded-2xl border-white/10 glass hover:bg-white/10 font-bold text-lg hover:scale-105 transition-all">
                            <a href={result.inviteUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-3 h-6 w-6" />
                                Join Discord Server
                            </a>
                        </Button>

                        <Link href="/dashboard" className="inline-flex items-center justify-center text-zinc-500 hover:text-white transition-all mt-4 font-medium group">
                            Back to Dashboard <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                <Link href={`/dashboard/orders`} className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    Back to Order Details
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase">Checkout</h1>
                            <p className="text-zinc-500">Secure your project and initialize production flow.</p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <Info className="w-3 h-3" /> Order Summary
                            </h3>
                            <div className="glass-card rounded-3xl p-8 border border-white/5 space-y-5 bg-zinc-900/40">
                                <div className="flex justify-between items-center group">
                                    <span className="text-zinc-400 font-medium group-hover:text-zinc-200 transition-colors">Base Project Fee ({project?.service_type?.toUpperCase()})</span>
                                    <span className="text-white font-bold font-mono">${basePrice}</span>
                                </div>
                                {appliedCoupon && (
                                    <div className="flex justify-between items-center text-green-500 font-bold animate-in fade-in slide-in-from-left-4 duration-500">
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-4 h-4" />
                                            <span>Promo Applied ({appliedCoupon.discountPercent}%)</span>
                                        </div>
                                        <span className="font-mono">-${discountAmount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400 font-medium">Priority Creative Research</span>
                                    <span className="text-green-500 font-bold uppercase text-[10px] tracking-widest">Included</span>
                                </div>
                                <div className="pt-5 border-t border-white/10 flex justify-between items-center">
                                    <span className="font-black text-white text-xl tracking-tighter uppercase">Total Investment</span>
                                    <span className="font-black text-primary text-3xl tracking-tighter font-mono shadow-glow-primary-small">${total}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/10 flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20">
                                <ShieldCheck className="text-green-500 w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">Escrow Protection Active</h4>
                                <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">Your payment is held in escrow. Funds are only fully released upon your approval of the final project deliverable.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card rounded-[2.5rem] p-8 border border-white/10 space-y-8 bg-zinc-900/60 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] -z-10 animate-pulse"></div>

                            <div className="space-y-4">
                                <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest">Transaction Mode</h3>
                                <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col items-center gap-4 text-center">
                                    <div className="h-12 w-12 rounded-full bg-[#5865F2] flex items-center justify-center shadow-glow-primary">
                                        <MessageSquare className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white uppercase tracking-tight">Discord Verified Payment</h4>
                                        <p className="text-[10px] text-zinc-500 font-medium leading-relaxed mt-1">Payment links and custom quotes are issued directly within your private production ticket on Discord.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 pt-4 border-t border-white/5">
                                {/* Service Agreement Hook */}
                                <div className="space-y-4">
                                    <div
                                        onClick={() => setShowAgreement(true)}
                                        className="p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Review Service Agreement</span>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-primary transition-colors" />
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 px-2">
                                        <div
                                            onClick={() => setHasAcceptedContract(!hasAcceptedContract)}
                                            className={cn(
                                                "w-5 h-5 rounded-md border transition-all flex items-center justify-center cursor-pointer mt-0.5",
                                                hasAcceptedContract ? "bg-primary border-primary" : "border-white/20 bg-white/5 hover:border-white/40"
                                            )}
                                        >
                                            {hasAcceptedContract && <Check className="w-3.5 h-3.5 text-black font-bold" />}
                                        </div>
                                        <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider leading-relaxed cursor-pointer" onClick={() => setHasAcceptedContract(!hasAcceptedContract)}>
                                            I agree to the <span className="text-white hover:text-primary underline transition-colors" onClick={(e) => { e.stopPropagation(); setShowAgreement(true); }}>International Client Service Agreement</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] pl-1">Apply Priority Coupon</label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1 group">
                                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                                            <input
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="ENTER CODE"
                                                className="h-14 w-full bg-white/5 rounded-2xl border border-white/10 pl-11 pr-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                            />
                                        </div>
                                        <button
                                            onClick={handleApplyCoupon}
                                            disabled={couponLoading || !couponCode}
                                            className="h-14 px-6 rounded-2xl border-white/10 hover:bg-white/10 font-bold uppercase text-[10px] tracking-widest text-white disabled:opacity-50"
                                        >
                                            {couponLoading ? "..." : "Apply"}
                                        </button>
                                    </div>
                                    {couponError && <p className="text-[10px] text-red-500 font-bold ml-1 animate-bounce">{couponError}</p>}
                                    {appliedCoupon && <p className="text-[10px] text-green-500 font-bold ml-1">✓ Discount Applied</p>}
                                </div>
                            </div>

                            <Button
                                onClick={handlePay}
                                disabled={isProcessing || !hasAcceptedContract}
                                className={cn(
                                    "w-full h-18 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all group overflow-hidden relative",
                                    hasAcceptedContract ? "bg-[#5865F2] hover:bg-[#4752C4] text-white" : "bg-zinc-800 text-zinc-500 grayscale opacity-50 cursor-not-allowed"
                                )}
                            >
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                <span className="relative z-10 flex items-center justify-center gap-3 lowercase">
                                    {isProcessing ? (
                                        <div className="h-5 w-5 rounded-full border-3 border-white border-t-transparent animate-spin"></div>
                                    ) : (
                                        <>INITIALIZE PRODUCTION <ArrowRight className="w-5 h-5" /></>
                                    )}
                                </span>
                            </Button>

                            <p className="text-[9px] text-zinc-600 text-center leading-relaxed font-bold uppercase tracking-wider">
                                Secure Initialization | Instant Ticket Creation | SLA Protection
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Agreement Modal */}
            <AnimatePresence>
                {showAgreement && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAgreement(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
                        >
                            <ServiceAgreement date={new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} />
                            <div className="p-6 bg-zinc-950/50 border-t border-white/10 flex justify-end">
                                <Button
                                    onClick={() => setShowAgreement(false)}
                                    className="rounded-xl bg-white text-black font-bold h-12 px-8 hover:scale-105 transition-all"
                                >
                                    Dismiss Review
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
