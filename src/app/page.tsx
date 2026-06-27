import Hero from "@/components/home/Hero";
import FeaturedCategoriesSection from "@/components/marketing/FeaturedCategoriesSection";

export default function Home() {
  return (
    <main className="min-h-[400svh] relative">
      <Hero />
      <FeaturedCategoriesSection />
    </main>
  );
}