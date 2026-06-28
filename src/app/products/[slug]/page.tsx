// src/app/products/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getProductBySlug } from "@/server";
import { MOCK_PRODUCTS } from "@/components/home/shop-sections/data";
import ProductDetail from "@/components/product/ProductDetail";
import { getRelatedMockProducts } from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function resolveProduct(slug: string) {
  // DB-backed products take priority
  try {
    const dbProduct = await getProductBySlug(slug);
    if (dbProduct) return dbProduct;
  } catch {
    // DB not seeded / unreachable in dev — fall through to mock data
  }
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await resolveProduct(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} — Hermes`,
    description: product.description ?? `Shop ${product.name} by ${product.brand}.`,
    openGraph: {
      images: product.image?.imageUrl ? [product.image.imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product] = await Promise.all([resolveProduct(slug), auth()]);

  if (!product) notFound();

  const related = getRelatedMockProducts(product, 4);

  return <ProductDetail product={product} related={related} />;
}