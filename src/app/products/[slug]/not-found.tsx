// src/app/products/[slug]/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { PackageOutOfStockIcon } from "@hugeicons/core-free-icons";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[60dvh] w-full flex-col items-center justify-center gap-4 px-4 text-center">
      <HugeiconsIcon
        icon={PackageOutOfStockIcon}
        size={20}
        color="currentColor"
        strokeWidth={1.5}
      />
      <h1 className="text-xl font-heading font-semibold">Product not found</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        The item you're looking for may have sold out or moved. Browse our
        latest arrivals instead.
      </p>
      <Button asChild>
        <Link href="/">Back to Shop</Link>
      </Button>
    </div>
  );
}
