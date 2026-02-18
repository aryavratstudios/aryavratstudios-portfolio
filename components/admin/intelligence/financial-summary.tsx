"use client";

import { DollarSign, ArrowUpRight, Clock, ShieldAlert } from "lucide-react";
import { SensitiveData } from "@/components/design-system/data-blur-toggle";

interface FinancialStats {
    total_price: number;
    amount_received: number;
    pending_balance: number;
    currency: string;
}

export function FinancialSummary({ stats }: { stats: FinancialStats }) {
    const completionPercent = (stats.amount_received / stats.total_price) * 100 || 0;
    const currencySym = stats.currency === 'USD' ? '$' : stats.currency;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 rounded-3xl border border-white/5 bg-zinc-900/40">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Total Agreed</p>
                    <div className="flex items-baseline gap-1">
                        <SensitiveData className="text-2xl font-black text-white">
                            {currencySym}{stats.total_price}
                        </SensitiveData>
                        <span className="text-[10px] font-bold text-zinc-600">{stats.currency}</span>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-3xl border border-white/5 bg-green-500/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-green-500/50 mb-2">Paid Sync</p>
                    <div className="flex items-baseline gap-1">
                        <SensitiveData className="text-2xl font-black text-green-500">
                            {currencySym}{stats.amount_received}
                        </SensitiveData>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Payment Pipeline</span>
                    <span className="text-[10px] font-black uppercase text-white">{completionPercent.toFixed(0)}%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full shadow-glow-primary transition-all duration-1000"
                        style={{ width: `${completionPercent}%` }}
                    />
                </div>
            </div>

            {stats.pending_balance > 0 && (
                <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-3 animate-pulse">
                    <ShieldAlert className="w-5 h-5 text-orange-500" />
                    <div>
                        <p className="text-[10px] font-black uppercase text-orange-500 mb-0.5">Payment Pending</p>
                        <p className="text-xs font-bold text-white">
                            Remaining balance of <SensitiveData>{currencySym}{stats.pending_balance}</SensitiveData>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
