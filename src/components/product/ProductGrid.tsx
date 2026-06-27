import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

// Same Tailwind-literal-class constraint as ProductCarousel's basis presets.
const GRID_PRESETS = {
  "2-3-4": "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
  "2-4-5": "grid-cols-2 sm:grid-cols-4 md:grid-cols-5",
  "1-2-3": "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
} as const;

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
  preset?: keyof typeof GRID_PRESETS;
  className?: string;
  onWishlistToggle?: (id: Product["id"], active: boolean) => void;
}

export function ProductGrid({
  products,
  loading = false,
  skeletonCount = 8,
  preset = "2-3-4",
  className,
  onWishlistToggle,
}: ProductGridProps) {
  const gridClass = GRID_PRESETS[preset];

  return (
    <div className={cn("grid gap-3", gridClass, className)}>
      {(loading ? Array.from({ length: skeletonCount }) : products).map((item, index) =>
        loading ? (
          <ProductCardSkeleton key={index} />
        ) : (
          <ProductCard
            key={(item as Product).id}
            product={item as Product}
            onWishlistToggle={onWishlistToggle}
          />
        )
      )}
    </div>
  );
}