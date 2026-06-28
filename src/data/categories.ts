import type { Category } from "@/types/product";

// Placeholder imagery via picsum.photos seeded URLs — deterministic per slug,
// so each category keeps the same image across reloads. Swap for real
// product photography (or a CMS) once that's wired up.
export const categories: Category[] = [
  {
    id: "bags",
    slug: "bags",
    title: "Bags",
    image: "https://picsum.photos/seed/hermes-bags/640/640",
  },
  {
    id: "shoes",
    slug: "shoes",
    title: "Shoes",
    image: "https://picsum.photos/seed/hermes-shoes/640/640",
  },
  {
    id: "ready-to-wear",
    slug: "ready-to-wear",
    title: "Ready-to-Wear",
    image: "https://picsum.photos/seed/hermes-rtw/640/640",
  },
  {
    id: "accessories",
    slug: "accessories",
    title: "Accessories",
    image: "https://picsum.photos/seed/hermes-accessories/640/640",
  },
  {
    id: "jewelry",
    slug: "jewelry",
    title: "Jewelry",
    image: "https://picsum.photos/seed/hermes-jewelry/640/640",
  },
  {
    id: "watches",
    slug: "watches",
    title: "Watches",
    image: "https://picsum.photos/seed/hermes-watches/640/640",
  },
];