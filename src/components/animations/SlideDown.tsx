"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { slideDownVariants } from "@/lib/animations/framerVariants";

interface SlideDownProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Animates height + opacity for collapsible sections.
 * Use for: mobile menu accordion groups, the announcement bar collapsing on scroll.
 */
export default function SlideDown({ open, children, className }: SlideDownProps) {
  return (
    <motion.div
      initial={false}
      animate={open ? "expanded" : "collapsed"}
      variants={slideDownVariants}
      className={`overflow-hidden ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}