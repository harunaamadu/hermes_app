// src/app/products/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import {
  getProductBySlug as getSanityProductBySlug,
  getProductsByCategory as getSanityProductsByCategory,
} from "@/sanity/lib/fetch";
import { MOCK_PRODUCTS } from "@/components/home/shop-sections/data";
import ProductDetail from "@/components/product/ProductDetail";
import { getRelatedMockProducts } from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function resolveProduct(slug: string) {
  // Sanity (real catalog) takes priority; static mock data is a fallback
  // so demo/sample product pages keep working before the catalog is
  // populated in Sanity. (The old Prisma-backed lookup was removed —
  // products and categories are managed in Sanity now.)
  const sanityProduct = await getSanityProductBySlug(slug);
  if (sanityProduct) return sanityProduct;
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await resolveProduct(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} — Hermes`,
    description: product.description ?? `Shop ${product.name}${product.brand ? ` by ${product.brand}` : ""}.`,
    openGraph: {
      images: product.image?.imageUrl ? [product.image.imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product] = await Promise.all([resolveProduct(slug), auth()]);

  if (!product) notFound();

  const sanityRelated = await getSanityProductsByCategory(product.category);
  const related = sanityRelated.length
    ? sanityRelated.filter((p) => p.id !== product.id).slice(0, 4)
    : getRelatedMockProducts(product, 4);

  return <ProductDetail product={product} related={related} />;
}