"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

// Full, literal class strings — Tailwind scans source text for complete
// class names, so these presets can't be built from template strings
// at runtime (e.g. `basis-1/${n}`) or they won't be generated.
const BASIS_PRESETS = {
  default: "basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6",
  comfortable: "basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4",
  compact: "basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6",
} as const;

interface ProductCarouselProps {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
  basis?: keyof typeof BASIS_PRESETS;
  className?: string;
  onWishlistToggle?: (id: Product["id"], active: boolean) => void;
}

export function ProductCarousel({
  products,
  loading = false,
  skeletonCount = 6,
  basis = "default",
  className,
  onWishlistToggle,
}: ProductCarouselProps) {
  const basisClass = BASIS_PRESETS[basis];

  return (
    <Carousel
      opts={{ align: "start", dragFree: true }}
      className={cn("group relative w-full max-w-full", className)}
    >
      <CarouselContent className="-ml-3">
        {(loading ? Array.from({ length: skeletonCount }) : products).map((item, index) => (
          <CarouselItem
            key={loading ? index : (item as Product).id}
            className={cn("pl-3", basisClass)}
          >
            {loading ? (
              <ProductCardSkeleton />
            ) : (
              <ProductCard
                product={item as Product}
                onWishlistToggle={onWishlistToggle}
                className="h-full"
              />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-1 opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-0" />
      <CarouselNext className="right-1 opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-0" />
    </Carousel>
  );
}