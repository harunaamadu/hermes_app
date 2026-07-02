import { HugeiconsIcon } from "@hugeicons/react";
import {
  Clock01Icon,
  ShoppingBag01Icon,
  SparklesIcon,
  ChampionIcon,
} from "@hugeicons/core-free-icons";
import type { ComponentProps } from "react";
import { ProductCardProps } from "@/components/product/ProductCard";

export type ProductBadge =
  | "best-seller"
  | "new"
  | "sale"
  | "limited"
  | "prime"
  | "hot";

export const SEARCH_CATEGORIES = [
  "All",
  "fashion",
  "electronics",
  "home",
  "beauty",
  "sports",
  "toys",
  "books",
  "automotive",
] as const;

export type ProductCategory = (typeof SEARCH_CATEGORIES)[number];

export interface ProductImage {
  imageUrl: string;
  alt?: string;
  href?: string;
  variant?: ProductCardProps["variant"];
}

export interface ProductReview {
  rating: number; // 1–5
  count: number;
  compact?: boolean;
}

export interface ProductVariant {
  label: string;
  value: string;
  inStock: boolean;
}

// Real category taxonomy (Bags, Shoes, Accessories, ...) is data-driven —
// editors add/rename/remove categories in Sanity, so this can't be a fixed
// union. `ProductCategory` above stays as-is; it's a separate, smaller list
// used only by the search bar's category dropdown.
export interface Category {
  id: string;
  slug: string;
  title: string;
  image: string;
  href?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand?: string;
  /** Category slug, e.g. "bags" — references a Category, not the fixed ProductCategory union. */
  category: string;
  /** Category document id — only populated by the Sanity-backed fetch layer, used to preselect the category in edit forms. */
  categoryId?: string;

  image: ProductImage;
  images?: string[];

  price: number;
  originalPrice?: number;
  discountPercent?: number;
  currency?: string; // default "$"

  review: ProductReview;

  badge?: ProductBadge;
  description?: string;

  tag?: string | string[];

  variants?: ProductVariant[];

  inStock?: boolean;
  stockCount?: number;
  freeShipping?: boolean;
  deliveryDays?: number;

  sold?: number;

  isWishlisted?: boolean;
  isTrending?: boolean;

  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

export interface ProductGridFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  badge?: ProductBadge;
  freeShipping?: boolean;
  inStock?: boolean;
  sort?: SortOption;
}

// HugeIcons has no per-icon component type to alias (unlike lucide's
// `LucideIcon`). The closest equivalent is the type of the `icon` prop
// that `HugeiconsIcon` itself accepts — derive it directly so it always
// matches whatever icon-data shape the installed package version uses.
export type HugeIconData = ComponentProps<typeof HugeiconsIcon>["icon"];

export const EMPTY_STATE_ICONS = {
  history: Clock01Icon,
  bestsellers: ChampionIcon,
  default: ShoppingBag01Icon,
  recommendations: SparklesIcon,
} satisfies Record<string, HugeIconData>;

export type EmptyStatePreset = keyof typeof EMPTY_STATE_ICONS;

// ─── ProductsEmpty ─────────────────────────────────────────────

export interface ProductsEmptyProps {
  /** Icon preset key, or raw icon data to pass straight to HugeiconsIcon */
  icon?: EmptyStatePreset | HugeIconData;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ProductLayoutProps {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
  link?: { href: string; label: string };
  breakpoint?: "sm" | "md";
  mobileCardBasis?: string;
  emptyIcon?: EmptyStatePreset;
  emptyTitle?: string;
  emptyDescription?: string;
  columns?: 2 | 4 | 5;
  stagger?: number;
}

// ─── ProductsSkeleton ─────────────────────────────────────────────────

export interface ProductsSkeletonProps {
  count?: number;
  className?: string;
}

export interface ProductItem {
  id: string;
  title: string;
  image: string;
  href?: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  slug?: string;
  image: string;
  href?: string;
}

export interface ShopSectionData {
  id: string;
  heading: string;
  variant:
    | "grid-2x2"
    | "hero-subcategories"
    | "featured-large"
    | "subcategory-2x2"
    | "carousel";
  items: (ProductItem | CategoryItem)[];
  cta?: { label: string; href: string };
}