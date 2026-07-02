// src/components/product/ProductDetail.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  DeliveryTruckIcon,
  FavouriteIcon,
  MinusSignIcon,
  Add01Icon,
  Shield01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductCard from "@/components/product/ProductCard";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { cn } from "@/lib/utils";
import type { Product, ProductVariant } from "@/types/product";
import { PriceTag } from "./PriceTag";
import { RatingStars } from "./RatingStars";
import { getDefaultVariantSelection, VariantSelector } from "./VariantSelector";

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

export default function ProductDetail({
  product,
  related = [],
}: ProductDetailProps) {
  const allImages = useMemo(
    () => [product.image.imageUrl, ...(product.images ?? [])].filter(Boolean),
    [product],
  );

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(product.variants?.find((v) => v.inStock));
  const [qty, setQty] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const cartLine = useCartStore((s) =>
    s.items.find(
      (i) =>
        i.product.id === product.id &&
        i.selectedVariant?.value === selectedVariant?.value,
    ),
  );

  const wishlisted = useWishlistStore((s) => s.has(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const hasVariants = (product.variants?.length ?? 0) > 0;
  // const variantOk = !hasVariants || Boolean(selectedVariant);
  const outOfStock =
    product.inStock === false ||
    (hasVariants && selectedVariant && !selectedVariant.inStock);

  const [selectedByLabel, setSelectedByLabel] = useState<
    Record<string, ProductVariant | undefined>
  >(() => getDefaultVariantSelection(product.variants ?? []));
  const [attemptedAdd, setAttemptedAdd] = useState(false);
  
  const variantGroupCount = useMemo(
    () => new Set((product.variants ?? []).map((v) => v.label)).size,
    [product.variants],
  );
  const selectedValues = Object.values(selectedByLabel).filter(
    Boolean,
  ) as ProductVariant[];
  const variantOk = !hasVariants || selectedValues.length === variantGroupCount;

  const handleAddToCart = () => {
    if (!variantOk || outOfStock) return;
    addItem(product, selectedVariant, qty);
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
              <BreadcrumbLink
                href={`/category/${product.category}`}
                className="capitalize"
              >
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">
                {product.name}
              </BreadcrumbPage>
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
                onClick={() => toggleWishlist(product)}
                aria-label={
                  wishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                aria-pressed={wishlisted}
                className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center bg-background/80 backdrop-blur-sm transition-colors hover:text-destructive"
              >
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  size={16}
                  className={cn(
                    wishlisted && "fill-destructive text-destructive",
                  )}
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
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
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

            <RatingStars
              rating={product.review.rating}
              reviewCount={product.review.count}
              size="lg"
            />

            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              className="mt-2"
              size="lg"
            />

            {product.description && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            <Separator />

            {/* Variant selector — separate rows for Size, Color, etc. */}
            {hasVariants && (
              <VariantSelector
                variants={product.variants!}
                selected={selectedByLabel}
                onSelect={(label, variant) =>
                  setSelectedByLabel((prev) => ({ ...prev, [label]: variant }))
                }
                showValidation={attemptedAdd}
              />
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
                  <HugeiconsIcon icon={MinusSignIcon} size={14} />
                </button>
                <span className="w-10 text-center text-sm tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex size-10 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <HugeiconsIcon icon={Add01Icon} size={14} />
                </button>
              </div>

              <Button
                size="lg"
                className="flex-1 size-11"
                disabled={!variantOk || outOfStock}
                onClick={handleAddToCart}
              >
                {outOfStock
                  ? "Out of Stock"
                  : cartLine
                    ? `Add More (${cartLine.quantity} in cart)`
                    : "Add to Cart"}
              </Button>
            </div>

            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
              {product.freeShipping && (
                <span className="flex items-center gap-2">
                  <HugeiconsIcon icon={DeliveryTruckIcon} size={14} />
                  Free shipping
                  {product.deliveryDays
                    ? ` · Arrives in ${product.deliveryDays} day${product.deliveryDays > 1 ? "s" : ""}`
                    : ""}
                </span>
              )}
              <span className="flex items-center gap-2">
                <HugeiconsIcon icon={Shield01Icon} size={14} />
                30-day hassle-free returns
              </span>
            </div>

            <Separator />

            <Accordion type="single" collapsible defaultValue="details">
              <AccordionItem value="details">
                <AccordionTrigger>Product details</AccordionTrigger>
                <AccordionContent>
                  <p>
                    {product.description ?? "No additional details available."}
                  </p>
                  {Array.isArray(product.tag) && product.tag.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {product.tag.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & returns</AccordionTrigger>
                <AccordionContent>
                  Orders ship within 1–2 business days. Returns accepted within
                  30 days of delivery, unworn and with tags attached.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* ── Related products ─────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-lg font-heading font-semibold">
              You may also like
            </h2>
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
