"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon } from "@hugeicons/core-free-icons";

interface RatingStarsProps {
  rating: number; // 0-5
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}

const SIZE_CLASS = {
  sm: "size-3",
  md: "size-4",
};

export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  className,
}: RatingStarsProps) {
  const clamped = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(clamped);
  const hasHalf = clamped - fullStars >= 0.5;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < fullStars;
          const half = i === fullStars && hasHalf;
          return (
            <span key={i} className="relative inline-flex">
              <HugeiconsIcon
                icon={StarIcon}
                size={16}
                color="currentColor"
                strokeWidth={1.5}
                className={cn(SIZE_CLASS[size], "text-muted-foreground/30")}
              />
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: half ? "50%" : "100%" }}
                >
                  <HugeiconsIcon
                    icon={StarIcon}
                    size={16}
                    color="currentColor"
                    strokeWidth={1.5}
                    className={cn(
                      SIZE_CLASS[size],
                      "fill-amber-500 text-amber-500",
                    )}
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {typeof reviewCount === "number" && (
        <span className="text-xs text-muted-foreground hover:underline">
          {reviewCount.toLocaleString()}
        </span>
      )}
    </div>
  );
}
