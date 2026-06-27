import Link from "next/link";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/types/product";
import { ProductCarousel } from "./ProductCarousel";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

interface ProductRowProps {
  title: string;
  seeAllHref?: string;
  products: Product[];
  loading?: boolean;
  basis?: "default" | "comfortable" | "compact";
  className?: string;
  onWishlistToggle?: (id: Product["id"], active: boolean) => void;
}

export function ProductRow({
  title,
  seeAllHref,
  products,
  loading = false,
  basis = "default",
  className,
  onWishlistToggle,
}: ProductRowProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mb-3 flex items-baseline justify-between">
        {loading ? (
          <Skeleton className="h-6 w-48" />
        ) : (
          <h2 className="text-lg font-semibold tracking-tight md:text-xl">
            {title}
          </h2>
        )}

        {!loading && seeAllHref && (
          <Link
            href={seeAllHref}
            className="flex items-center gap-0.5 text-sm font-medium text-primary hover:underline"
          >
            See all
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={18}
              color="currentColor"
              strokeWidth={1.5}
            />
          </Link>
        )}
      </div>

      <ProductCarousel
        products={products}
        loading={loading}
        basis={basis}
        onWishlistToggle={onWishlistToggle}
      />
    </section>
  );
}
