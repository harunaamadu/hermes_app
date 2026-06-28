import React from "react";
import Container from "../common/Container";
import StaggerChildren from "../animations/StaggerChildren";
import { CategoryGrid } from "@/components/product/CategoryGrid";
import { ProductRow } from "@/components/product/ProductRow";
import { ProductGrid } from "@/components/product/ProductGrid";
import { categories } from "@/data/categories";
import { bestSellers, deals, recommended } from "@/data/products";

const FeaturedCategoriesSection = () => {
  return (
    <Container className="min-h-screen">
      <StaggerChildren>
        <CategoryGrid categories={categories.slice(0, 4)} />

        <ProductRow
          title="Today's deals"
          seeAllHref="/deals"
          products={deals}
        />
        <ProductRow
          title="Recommended for you"
          products={recommended}
          basis="compact"
        />
        <ProductGrid products={bestSellers} preset="2-4-5" />
      </StaggerChildren>
    </Container>
  );
};

export default FeaturedCategoriesSection;
