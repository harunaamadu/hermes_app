import React from "react";
import Container from "@/components/common/Container";
import { getAllProducts } from "@/sanity/lib/fetch";
import { isSanityConfigured } from "@/sanity/env";
import { LiveProductGrid } from "@/components/product/LiveProductGrid";

const ProductsSection = async () => {
  const products = await getAllProducts();

  return (
    <Container
      as="section"
      className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 min-h-full w-full pb-12"
    >
      <LiveProductGrid
        initialProducts={products}
        isSanityConfigured={isSanityConfigured}
      />
    </Container>
  );
};

export default ProductsSection;