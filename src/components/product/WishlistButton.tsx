"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HeartAddIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface WishlistButtonProps {
  active?: boolean;
  onToggle?: (active: boolean) => void;
  className?: string;
}

export function WishlistButton({
  active = false,
  onToggle,
  className,
}: WishlistButtonProps) {
  const [isActive, setIsActive] = React.useState(active);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !isActive;
    setIsActive(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isActive}
      aria-label={isActive ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-background/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-background",
        className,
      )}
    >
      <motion.span
        key={isActive ? "active" : "inactive"}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <HugeiconsIcon
          icon={HeartAddIcon}
          size={24}
          color="currentColor"
          strokeWidth={1.5}
          className={cn(
            "h-4 w-4 transition-colors",
            isActive ? "fill-red-500 text-red-500" : "text-foreground/70",
          )}
        />
      </motion.span>
    </button>
  );
}
