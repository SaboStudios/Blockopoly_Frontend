"use client";
import { AnimationVariant, AnimationWrapperProps } from "@/types/animate";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const variants: Record<AnimationVariant, Variants> = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },

    slideUp: {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    },

    slideDown: {
        hidden: { y: -50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    },

    slideLeft: {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1 },
    },

    slideRight: {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1 },
    },

    scale: {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
    },

    bounce: {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 15,
            },
        },
    },
};

export default function AnimationWrapper({
    children,
    variant = "fadeIn",
    delay = 0,
    duration = 0.5,
    className = "",
    once = true,
    ...props
}: AnimationWrapperProps) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once }}
            variants={variants[variant]}
            transition={prefersReducedMotion ? { duration: 0 } : { duration, delay }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/**
 * TurnHighlight — pulses the active player's surface. Non-essential motion,
 * so it is fully disabled when the user prefers reduced motion.
 */
export function TurnHighlight({
    active,
    children,
    className = "",
}: {
    active: boolean;
    children: React.ReactNode;
    className?: string;
}) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            animate={
                active && !prefersReducedMotion
                    ? { boxShadow: [
                        "0 0 0 0 rgba(250, 204, 21, 0.6)",
                        "0 0 0 8px rgba(250, 204, 21, 0)",
                    ] }
                    : { boxShadow: "0 0 0 0 rgba(250, 204, 21, 0)" }
            }
            transition={
                active && !prefersReducedMotion
                    ? { duration: 1.4, repeat: Infinity }
                    : { duration: 0 }
            }
        >
            {children}
        </motion.div>
    );
}

/**
 * CashDelta — floating +/- number for cash changes. Honors reduced motion by
 * rendering the value statically instead of animating it away.
 */
export function CashDelta({
    amount,
    className = "",
}: {
    amount: number;
    className?: string;
}) {
    const prefersReducedMotion = useReducedMotion();
    const positive = amount >= 0;
    const label = `${positive ? "+" : "-"}$${Math.abs(amount)}`;

    if (prefersReducedMotion) {
        return (
            <span
                className={`${className} ${positive ? "text-green-400" : "text-red-400"}`}
            >
                {label}
            </span>
        );
    }

    return (
        <motion.span
            className={`${className} ${positive ? "text-green-400" : "text-red-400"}`}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: -32 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
            {label}
        </motion.span>
    );
}

/**
 * TokenMove — animates a board token between positions. Reduced motion snaps
 * the token to its destination without a transition.
 */
export function TokenMove({
    x,
    y,
    children,
    className = "",
}: {
    x: number;
    y: number;
    children: React.ReactNode;
    className?: string;
}) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            animate={{ x, y }}
            transition={
                prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 260, damping: 24 }
            }
        >
            {children}
        </motion.div>
    );
}

/**
 * useReducedMotionPreference — exposes the reduced-motion preference so
 * non-framer consumers (e.g. the settings panel) can read and react to it.
 */
export function useReducedMotionPreference(): boolean {
    const prefersReducedMotion = useReducedMotion();
    const [reduced, setReduced] = useState(Boolean(prefersReducedMotion));
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        setReduced(Boolean(prefersReducedMotion));
    }, [prefersReducedMotion]);

    return mounted.current ? reduced : Boolean(prefersReducedMotion);
}
