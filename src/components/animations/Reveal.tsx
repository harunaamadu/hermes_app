"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  distance?: number;
  className?: string;
}

const getOffset = (direction: RevealDirection, distance: number) => {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    case "none":
      return { x: 0, y: 0 };
  }
};

/**
 * Fades + lifts (or slides) content into view as it scrolls into the viewport.
 * Use for: PromotionalGrid items, ProductCard grids, marketing sections.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  className,
}: RevealProps) {
  const { x, y } = getOffset(direction, distance);

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}