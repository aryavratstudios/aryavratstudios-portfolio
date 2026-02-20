"use client";

import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Clock, CheckCircle, Search, Filter, ArrowUpRight, MessageSquare, Zap } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchOrders = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase
                    .from("projects")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });
                setOrders(data || []);
            }
            setLoading(false);
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-24">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-2">My Orders</h1>
                    <p className="text-zinc-500">Track and manage your creative pipeline history.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <input
                            placeholder="Filter by title..."
                            className="h-11 w-64 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary focus:outline-none focus:bg-white/10 transition-all"
                        />
                    </div>
                </div>
            </motion.div>

            {orders.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-32 rounded-[3rem] border border-dashed border-white/10 bg-white/5 backdrop-blur-sm"
                >
                    <div className="h-20 w-20 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-6 text-zinc-500">
                        <Package className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No active orders yet</h3>
                    <p className="text-zinc-500 max-w-sm mx-auto mb-10 text-lg">Your creative journey begins here. Launch your first project with us.</p>
                    <Button asChild size="lg" className="rounded-full px-10 h-14 font-bold shadow-glow-primary">
                        <Link href="/dashboard/new">Launch Project</Link>
                    </Button>
                </motion.div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order, i) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Card className="glass-card border-white/5 bg-zinc-900/40 hover:border-primary/20 hover:bg-zinc-900/60 transition-all duration-300 group overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row md:items-center">
                                        <div className="p-8 flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
                                                    ${order.status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                                        order.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                            'bg-zinc-800 text-zinc-400 border border-white/5'}`}>
                                                    {order.status.replace('_', ' ')}
                                                </span>
                                                <span className="text-zinc-500 text-xs font-bold uppercase tracking-tighter">Ordered {new Date(order.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{order.title}</h3>
                                            <p className="text-zinc-500 line-clamp-2 mb-6 max-w-2xl">{order.description}</p>

                                            <div className="flex flex-wrap gap-4">
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-xs text-zinc-400">
                                                    <Clock className="w-3 h-3" />
                                                    Service: <span className="text-white font-bold ml-1">{order.service_type.toUpperCase()}</span>
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-xs text-zinc-400">
                                                    <MessageSquare className="w-3 h-3" />
                                                    0 Comments
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:w-64 bg-white/5 p-8 flex flex-col justify-center items-center md:border-l border-white/10 border-t md:border-t-0 space-y-3">
                                            {order.status === 'pending_review' && (
                                                <Button asChild className="w-full rounded-xl bg-primary text-black font-bold h-11 hover:scale-105 transition-all shadow-glow-primary">
                                                    <Link href={`/dashboard/checkout/${order.id}`}>
                                                        Complete Payment <Zap className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            )}
                                            <Button asChild variant="outline" className="w-full rounded-xl border-white/10 text-zinc-400 hover:text-white h-11 transition-all">
                                                <Link href={`/dashboard/orders/${order.id}`}>
                                                    Details <ArrowUpRight className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" className="w-full rounded-xl text-zinc-500 hover:text-white" disabled>
                                                Invoice
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
