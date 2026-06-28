"use client";

import Reveal from "@/components/animations/Reveal";
import type { ShopSectionData } from "@/types/product";
import {
  Grid2x2Body,
  FeaturedLargeBody,
  HeroSubcategoriesBody,
  Subcategory2x2Body,
} from "./CardBodies";
import CarouselCard from "./CarouselCard";
import TitleBar from "../ui/TitleBar";

interface ShopCardProps {
  data: ShopSectionData;
  /** Stagger delay index — multiplied by 0.08s */
  index?: number;
}

export default function ShopCard({ data, index = 0 }: ShopCardProps) {
  // Carousel variant renders its own full-width layout — skip the standard card wrapper
  if (data.variant === "carousel") {
    return <CarouselCard data={data} index={index} />;
  }

  return (
    <Reveal
      variant="up"
      delay={index * 0.08}
      duration={0.65}
      ease="power3.out"
      triggerStart="top 90%"
      className="flex flex-col bg-background p-4 shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300"
    >
      {/* Heading */}
      <TitleBar title={data.heading} size="xs" />

      {/* Card body — grows to fill available space */}
      <div className="flex-1">
        {data.variant === "grid-2x2" && <Grid2x2Body data={data} />}
        {data.variant === "featured-large" && <FeaturedLargeBody data={data} />}
        {data.variant === "hero-subcategories" && (
          <HeroSubcategoriesBody data={data} />
        )}
        {data.variant === "subcategory-2x2" && (
          <Subcategory2x2Body data={data} />
        )}
      </div>

      {/* CTA */}
      {data.cta && (
        <a
          href={data.cta.href}
          className="mt-4 inline-block text-xs font-medium text-[#007185] hover:underline"
        >
          {data.cta.label}
        </a>
      )}
    </Reveal>
  );
}
