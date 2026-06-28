import React from "react";
import { MOCK_PRODUCTS } from "@/components/home/shop-sections/data";
import ProductCard from "@/components/product/ProductCard";
import Container from "@/components/common/Container";

export const productCards = MOCK_PRODUCTS.map((product) => (
  <ProductCard key={product.slug} product={product} />
));

const ProductsSection = () => {
  return (
    <Container
      as="section"
      className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 min-h-full w-full pb-12"
    >
      {productCards}
    </Container>
  );
};

export default ProductsSection;
