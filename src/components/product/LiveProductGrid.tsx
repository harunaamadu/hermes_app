"use client";

import React from "react";
import ProductCard from "@/components/product/ProductCard";
import { useSanityRealtime } from "@/hooks/useSanityRealtime";
import { allProductsQuery, productsListenQuery } from "@/sanity/lib/queries";
import type { Product } from "@/types/product";

interface LiveProductGridProps {
  initialProducts: Product[];
  isSanityConfigured: boolean;
}

export function LiveProductGrid({
  initialProducts,
  isSanityConfigured,
}: LiveProductGridProps) {
  const { data: products } = useSanityRealtime<Product[]>({
    query: allProductsQuery,
    listenQuery: productsListenQuery,
    initialData: initialProducts,
    enabled: isSanityConfigured,
  });

  if (products.length === 0) {
    return (
      <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
        {isSanityConfigured
          ? "No products yet — add some from the dashboard or in Sanity Studio."
          : "Connect Sanity to show real products here. See SANITY_SETUP.md."}
      </p>
    );
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}