import { MOCK_PRODUCTS } from "@/components/home/shop-sections/data";
import type { Product } from "@/types/product";

export function getRelatedMockProducts(product: Pick<Product, "id" | "category">, limit = 4): Product[] {
  return MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, limit);
}