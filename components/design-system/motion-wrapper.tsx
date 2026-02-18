"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionWrapperProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
}

export function MotionWrapper({
    children,
    className,
    delay = 0,
    direction = "up"
}: MotionWrapperProps) {
    const variants: any = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
            x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
            scale: direction === "none" ? 0.95 : 1
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.4, 0.25, 1],
                delay: delay
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
