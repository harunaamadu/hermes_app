// src/components/product/ProductDetail.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon, MinusIcon, PlusIcon, HeartIcon, TruckIcon, ShieldCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProductCard from "@/components/product/ProductCard";
import { useCartStore } from "@/store/cart.store";
import { cn } from "@/lib/utils";
import type { Product, ProductVariant } from "@/types/product";

interface ProductDetailProps {
  product: Product;
  related?: Product[];
}

const BADGE_LABEL: Record<string, string> = {
  "best-seller": "Best Seller",
  new: "New",
  sale: "Sale",
  limited: "Limited",
  prime: "Prime",
  hot: "Hot",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          size={14}
          className={cn(
            i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-neutral-200 text-neutral-200",
          )}
        />
      ))}
    </div>
  );
}

export default function ProductDetail({ product, related = [] }: ProductDetailProps) {
  const allImages = useMemo(
    () => [product.image.imageUrl, ...(product.images ?? [])].filter(Boolean),
    [product],
  );

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.find((v) => v.inStock),
  );
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(Boolean(product.isWishlisted));

  const addItem = useCartStore((s) => s.addItem);
  const cartLine = useCartStore((s) =>
    s.items.find(
      (i) =>
        i.product.id === product.id &&
        i.selectedVariant?.value === selectedVariant?.value,
    ),
  );

  const hasVariants = (product.variants?.length ?? 0) > 0;
  const variantOk = !hasVariants || Boolean(selectedVariant);
  const outOfStock = product.inStock === false || (hasVariants && selectedVariant && !selectedVariant.inStock);

  const handleAddToCart = () => {
    if (!variantOk || outOfStock) return;
    // store currently increments by 1 per call — loop for qty.
    // Prefer extending addItem(product, variant, qty) per the store patch above.
    for (let i = 0; i < qty; i++) addItem(product, selectedVariant);
    setQty(1);
  };

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-360 px-4 py-6 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/category/${product.category}`} className="capitalize">
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Gallery ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-3/4 w-full overflow-hidden bg-muted">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={allImages[activeImage] ?? product.image.imageUrl}
                    alt={product.image.alt ?? product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {product.badge && (
                <Badge className="absolute left-3 top-3 z-10 uppercase tracking-wide">
                  {BADGE_LABEL[product.badge] ?? product.badge}
                </Badge>
              )}

              <button
                type="button"
                onClick={() => setWishlisted((v) => !v)}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wishlisted}
                className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center bg-background/80 backdrop-blur-sm transition-colors hover:text-destructive"
              >
                <HeartIcon
                  size={16}
                  className={cn(wishlisted && "fill-destructive text-destructive")}
                />
              </button>
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {allImages.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-current={activeImage === i}
                    className={cn(
                      "relative aspect-square overflow-hidden bg-muted ring-1 ring-transparent transition-all",
                      activeImage === i && "ring-foreground",
                    )}
                  >
                    <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {product.brand}
              </p>
              <h1 className="mt-1 text-2xl font-heading font-semibold leading-tight text-foreground md:text-3xl">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Stars rating={product.review.rating} />
              <span className="text-sm text-muted-foreground">
                {product.review.rating.toFixed(1)} · {product.review.count.toLocaleString()} reviews
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-semibold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  {product.discountPercent && (
                    <Badge variant="destructive">-{product.discountPercent}%</Badge>
                  )}
                </>
              )}
            </div>

            {product.description && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            <Separator />

            {/* Variant selector */}
            {hasVariants && (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
                  Select option
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants!.map((v) => (
                    <button
                      key={v.value}
                      type="button"
                      disabled={!v.inStock}
                      onClick={() => setSelectedVariant(v)}
                      aria-pressed={selectedVariant?.value === v.value}
                      className={cn(
                        "min-w-11 border px-3 py-2 text-xs font-medium uppercase tracking-wide transition-colors",
                        selectedVariant?.value === v.value
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-foreground hover:border-foreground",
                        !v.inStock && "cursor-not-allowed border-border/40 text-muted-foreground/50 line-through",
                      )}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
                {!variantOk && (
                  <p className="text-xs text-destructive">Please select an option.</p>
                )}
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex size-10 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <MinusIcon size={14} />
                </button>
                <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex size-10 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <PlusIcon size={14} />
                </button>
              </div>

              <Button
                size="lg"
                className="flex-1"
                disabled={!variantOk || outOfStock}
                onClick={handleAddToCart}
              >
                {outOfStock ? "Out of Stock" : cartLine ? `Add More (${cartLine.quantity} in cart)` : "Add to Cart"}
              </Button>
            </div>

            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
              {product.freeShipping && (
                <span className="flex items-center gap-2">
                  <TruckIcon size={14} /> Free shipping
                  {product.deliveryDays ? ` · Arrives in ${product.deliveryDays} day${product.deliveryDays > 1 ? "s" : ""}` : ""}
                </span>
              )}
              <span className="flex items-center gap-2">
                <ShieldCheckIcon size={14} /> 30-day hassle-free returns
              </span>
            </div>

            <Separator />

            <Accordion type="single" collapsible defaultValue="details">
              <AccordionItem value="details">
                <AccordionTrigger>Product details</AccordionTrigger>
                <AccordionContent>
                  <p>{product.description ?? "No additional details available."}</p>
                  {Array.isArray(product.tag) && product.tag.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {product.tag.map((t) => (
                        <Badge key={t} variant="outline">{t}</Badge>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & returns</AccordionTrigger>
                <AccordionContent>
                  Orders ship within 1–2 business days. Returns accepted within 30 days of delivery, unworn and with tags attached.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* ── Related products ─────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-lg font-heading font-semibold">You may also like</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}