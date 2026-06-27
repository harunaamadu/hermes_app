"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { staggerContainer } from "@/lib/animations/framerVariants";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a list so children animate in with a slight delay between each.
 * Pair each direct child with the `staggerItem` variant from framerVariants.ts,
 * or just nest <FadeIn>/<Reveal> children — they'll inherit the stagger timing
 * via framer-motion's variant propagation.
 * Use for: mega menu columns, cart line items, search suggestion lists.
 */
export default function StaggerChildren({ children, className }: StaggerChildrenProps) {
  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className={className}>
      {children}
    </motion.div>
  );
}