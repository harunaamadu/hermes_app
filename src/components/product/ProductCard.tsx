"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { BadgeVariant, Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";
import { RatingStars } from "./RatingStars";
import { PriceTag } from "./PriceTag";
import { WishlistButton } from "./WishlistButton";

const BADGE_STYLES: Record<BadgeVariant, string> = {
  deal: "bg-red-600 text-white",
  bestseller: "bg-amber-500 text-black",
  new: "bg-emerald-600 text-white",
  limited: "bg-violet-600 text-white",
};

interface ProductCardProps {
  product: Product;
  className?: string;
  onWishlistToggle?: (id: Product["id"], active: boolean) => void;
}

export function ProductCard({ product, className, onWishlistToggle }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("h-full", className)}
    >
      <Link
        href={product.href ?? `/product/${product.slug}`}
        className="group flex h-full flex-col rounded-xl border bg-card p-3 transition-shadow hover:shadow-md"
      >
        <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-muted">
          {!imageLoaded && <Skeleton className="absolute inset-0 h-full w-full" />}
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            onLoad={() => setImageLoaded(true)}
            className={cn(
              "object-contain p-2 transition-all duration-300 group-hover:scale-[1.03]",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
          />

          {product.badge && (
            <span
              className={cn(
                "absolute left-2 top-2 rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                BADGE_STYLES[product.badge.variant ?? "deal"]
              )}
            >
              {product.badge.label}
            </span>
          )}

          <WishlistButton
            className="absolute right-2 top-2"
            onToggle={(active) => onWishlistToggle?.(product.id, active)}
          />
        </div>

        <p className="mb-1 line-clamp-2 text-sm text-foreground/90">{product.title}</p>

        {typeof product.rating === "number" && (
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} className="mb-1" />
        )}

        <PriceTag
          price={product.price}
          originalPrice={product.originalPrice}
          currency={product.currency}
          className="mt-auto"
        />

        {product.isPrime && (
          <span className="mt-1 text-xs font-medium text-sky-600">✓ Prime delivery</span>
        )}
      </Link>
    </motion.div>
  );
}