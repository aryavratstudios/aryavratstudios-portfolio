"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Context
type PrivacyContextType = {
    isBlurred: boolean;
    toggleBlur: () => void;
};

const PrivacyContext = createContext<PrivacyContextType>({
    isBlurred: true, // Default to true for security
    toggleBlur: () => { },
});

export const usePrivacy = () => useContext(PrivacyContext);

// Provider Component
export function PrivacyProvider({ children }: { children: React.ReactNode }) {
    const [isBlurred, setIsBlurred] = useState(true);

    const toggleBlur = () => setIsBlurred(prev => !prev);

    return (
        <PrivacyContext.Provider value={{ isBlurred, toggleBlur }}>
            {children}
        </PrivacyContext.Provider>
    );
}

// Toggle Button Component
export function DataBlurToggle({ className }: { className?: string }) {
    const { isBlurred, toggleBlur } = usePrivacy();

    return (
        <button
            onClick={toggleBlur}
            className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300",
                isBlurred
                    ? "bg-zinc-900/40 text-zinc-500 border-white/5 hover:bg-white/5 hover:text-white"
                    : "bg-red-500/10 text-red-500 border-red-500/20 shadow-glow-danger-small",
                className
            )}
            title={isBlurred ? "Reveal Sensitive Data" : "Hide Sensitive Data"}
        >
            {isBlurred ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span className="text-[9px] font-black uppercase tracking-widest hidden md:inline-block">
                {isBlurred ? "View Data" : "Hide Data"}
            </span>
        </button>
    );
}

// Blur Wrapper Component for Text
export function SensitiveData({ children, className }: { children: React.ReactNode, className?: string }) {
    const { isBlurred } = usePrivacy();

    return (
        <span className={cn(
            "transition-all duration-300",
            isBlurred ? "filter blur-sm select-none opacity-70" : "filter-none opacity-100",
            className
        )}>
            {children}
        </span>
    );
}
