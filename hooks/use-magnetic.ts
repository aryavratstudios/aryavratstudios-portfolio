"use client";

import { useRef, useState, useEffect } from "react";

export function useMagnetic(intensity: number = 0.5) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const { clientX, clientY } = e;
            const { width, height, left, top } = ref.current.getBoundingClientRect();

            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);

            // Only apply if within a certain distance
            const distance = Math.sqrt(middleX ** 2 + middleY ** 2);
            if (distance < 100) {
                setPosition({ x: middleX * intensity, y: middleY * intensity });
            } else {
                setPosition({ x: 0, y: 0 });
            }
        };

        const mouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        window.addEventListener("mousemove", mouseMove);

        // Cleanup listener is on the element itself for mouseleave to prevent "stuck" state
        const element = ref.current;
        element?.addEventListener("mouseleave", mouseLeave);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            element?.removeEventListener("mouseleave", mouseLeave);
        };
    }, [intensity]);

    const { x, y } = position;

    return {
        ref,
        style: {
            transform: `translate3d(${x}px, ${y}px, 0)`,
            transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
        },
    };
}
