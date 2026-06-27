export type BadgeVariant = "deal" | "bestseller" | "new" | "limited";

export interface ProductBadge {
  label: string;
  variant?: BadgeVariant;
}

export interface Product {
  id: string | number;
  slug: string;
  title: string;
  image: string;
  images?: string[];
  price: number;
  originalPrice?: number;
  currency?: string; // default "$"
  rating?: number; // 0-5
  reviewCount?: number;
  badge?: ProductBadge;
  isPrime?: boolean;
  href?: string;
}

export interface Category {
  id: string | number;
  slug: string;
  title: string;
  image: string;
  href?: string;
}