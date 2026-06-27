"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeVariants } from "@/lib/animations/framerVariants";

interface FadeInProps {
  show: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Mounts/unmounts children with a quick opacity transition.
 * Use for: header dropdowns, mega menu panels, dialogs, toasts.
 */
export default function FadeIn({ show, children, className }: FadeInProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeVariants}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}