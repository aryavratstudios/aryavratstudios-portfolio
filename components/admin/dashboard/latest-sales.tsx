"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LatestSales() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-stone-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Latest Sales</h2>
                <div className="flex gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
                    <span>Product</span>
                    <span className="hidden md:inline">Customer</span>
                    <span className="hidden md:inline">Status</span>
                    <span>Total</span>
                </div>
            </div>

            <div className="space-y-2">
                {[
                    { product: "Macbook Pro M3", id: "ID-9082", customer: "Rodney Cannon", status: "Shipped", total: "$2,400", img: "https://placehold.co/50x50" },
                    { product: "Dell XPS 15", id: "ID-1290", customer: "Sarah Smith", status: "Processing", total: "$1,800", img: "https://placehold.co/50x50" },
                    { product: "iPhone 15 Pro", id: "ID-8821", customer: "Mike Johnson", status: "Delivered", total: "$999", img: "https://placehold.co/50x50" },
                ].map((order, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/5 group">
                        <div className="flex items-center gap-4 w-1/3">
                            <img src={order.img} alt="Product" className="w-10 h-10 rounded-lg" />
                            <div>
                                <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{order.product}</p>
                                <p className="text-xs text-white/30">{order.id}</p>
                            </div>
                        </div>
                        <div className="hidden md:block w-1/3 text-sm text-white/60">{order.customer}</div>
                        <div className="hidden md:block w-1/6">
                            <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider",
                                order.status === 'Shipped' ? 'bg-emerald-500/20 text-emerald-400' :
                                    order.status === 'Processing' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                            )}>
                                {order.status}
                            </span>
                        </div>
                        <div className="font-bold text-white w-20 text-right">{order.total}</div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
