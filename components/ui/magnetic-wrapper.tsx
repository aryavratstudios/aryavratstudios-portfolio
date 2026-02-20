"use client";

import { useMagnetic } from "@/hooks/use-magnetic";

interface MagneticWrapperProps {
    children: React.ReactNode;
    intensity?: number;
    className?: string;
}

export function MagneticWrapper({ children, intensity = 0.5, className }: MagneticWrapperProps) {
    const { ref, style } = useMagnetic(intensity);
    return (
        <div ref={ref} style={style} className={className}>
            {children}
        </div>
    );
}
