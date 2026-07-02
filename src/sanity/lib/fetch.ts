import "server-only";
import type { CategoryItem, Product } from "@/types/product";
import { client } from "./client";
// import { isSanityConfigured } from "./env";
import {
  allCategoriesQuery,
  allProductsQuery,
  bestSellersQuery,
  dealsQuery,
  productBySlugQuery,
  productsByCategoryQuery,
  recommendedQuery,
  relatedProductsQuery,
} from "./queries";

interface SanityFetchOptions {
  query: string;
  params?: Record<string, unknown>;
  /** Cache tags — paired with revalidateTag() in the mutation actions and the webhook route. */
  tags?: string[];
}

async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: SanityFetchOptions): Promise<T | null> {
//   if (!isSanityConfigured) return null;

  try {
    return await client.fetch<T>(query, params, {
      // Standard Next.js fetch-cache model (this project doesn't have
      // Cache Components enabled) — cache indefinitely until a tag is
      // explicitly revalidated by a mutation or the Sanity webhook.
      next: { tags: ["sanity", ...tags] },
    });
  } catch (error) {
    console.error("[sanity] fetch failed:", error);
    return null;
  }
}

export async function getCategories(): Promise<CategoryItem[]> {
  const data = await sanityFetch<CategoryItem[]>({
    query: allCategoriesQuery,
    tags: ["category"],
  });
  return data ?? [];
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await sanityFetch<Product[]>({
    query: allProductsQuery,
    tags: ["product"],
  });
  return data ?? [];
}

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  const data = await sanityFetch<Product[]>({
    query: productsByCategoryQuery,
    params: { categorySlug },
    tags: ["product", `product:category:${categorySlug}`],
  });
  return data ?? [];
}

export async function getDeals(): Promise<Product[]> {
  const data = await sanityFetch<Product[]>({
    query: dealsQuery,
    tags: ["product"],
  });
  return data ?? [];
}

export async function getBestSellers(): Promise<Product[]> {
  const data = await sanityFetch<Product[]>({
    query: bestSellersQuery,
    tags: ["product"],
  });
  return data ?? [];
}

export async function getRecommended(): Promise<Product[]> {
  const data = await sanityFetch<Product[]>({
    query: recommendedQuery,
    tags: ["product"],
  });
  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return sanityFetch<Product>({
    query: productBySlugQuery,
    params: { slug },
    tags: ["product", `product:${slug}`],
  });
}

export async function getRelatedProducts(
  categoryId: string,
  excludeId: string,
): Promise<Product[]> {
  const data = await sanityFetch<Product[]>({
    query: relatedProductsQuery,
    params: { categoryId, excludeId },
    tags: ["product"],
  });
  return data ?? [];
}