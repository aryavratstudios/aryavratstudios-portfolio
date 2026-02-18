"use client";

import { cn } from "@/lib/utils";

type StatusType = "success" | "warning" | "error" | "info" | "neutral" | "pending" | "completed" | "active";

interface StatusChipProps {
    status: string;
    type?: StatusType; // Optional override, otherwise derived from status string
    className?: string;
}

export function StatusChip({ status, type, className }: StatusChipProps) {
    const getType = (s: string): StatusType => {
        if (type) return type;
        const lower = s.toLowerCase();
        if (lower.includes("complete") || lower.includes("delivered") || lower.includes("approved") || lower.includes("paid")) return "success";
        if (lower.includes("pending") || lower.includes("wait") || lower.includes("process")) return "warning";
        if (lower.includes("fail") || lower.includes("cancel") || lower.includes("error") || lower.includes("overdue")) return "error";
        if (lower.includes("active") || lower.includes("run")) return "active";
        return "neutral";
    };

    const styles: Record<StatusType, string> = {
        success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_10px_-4px_rgba(16,185,129,0.5)]",
        warning: "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_10px_-4px_rgba(245,158,11,0.5)]",
        error: "bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_-4px_rgba(239,68,68,0.5)]",
        info: "bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-[0_0_10px_-4px_rgba(59,130,246,0.5)]",
        neutral: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
        pending: "bg-orange-500/10 text-orange-500 border-orange-500/20 animate-pulse",
        completed: "bg-green-500/10 text-green-500 border-green-500/20",
        active: "bg-primary/10 text-primary border-primary/20 shadow-glow-primary-small",
    };

    const finalType = getType(status);

    return (
        <span className={cn(
            "inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border backdrop-blur-md transition-all",
            styles[finalType],
            className
        )}>
            {status.replace(/_/g, " ")}
        </span>
    );
}
