import Hero from "@/components/home/Hero";
import { ShopSectionsGrid } from "@/components/home/shop-sections";
import ProductsSection from "@/components/home/shop-sections/ProductsSection";

export default function Home() {
  return (
    <main className="min-h-full relative">
      <Hero />
      <ShopSectionsGrid />
      <ProductsSection />
    </main>
  );
}