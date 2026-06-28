"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { ShopSectionData } from "@/types/product";
import TitleBar from "../ui/TitleBar";
import Reveal from "@/components/animations/Reveal";

interface CarouselCardProps {
  data: ShopSectionData;
  index?: number;
}

/**
 * CarouselCard
 *
 * A full-width shop section card that renders its items in a horizontally
 * scrollable shadcn Carousel. Matches the Amazon "Based on your browsing
 * history" / "Trending Internationally" row style.
 *
 * Usage:
 *   <CarouselCard data={sectionData} />
 */

export default function CarouselCard({ data, index = 0 }: CarouselCardProps) {
  return (
    <Reveal
      variant="up"
      delay={index * 0.08}
      duration={0.65}
      ease="power3.out"
      triggerStart="top 92%"
      className="w-full p-4 pt-4 pb-3"
    >
      {/* Header */}
      <TitleBar
        title={data.heading}
        cta={
          data.cta
            ? {
                href: data.cta.href,
                label: data.cta.label,
              }
            : undefined
        }
      />

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {data.items.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-3 basis-35 sm:basis-40 md:basis-45 lg:basis-50 shrink-0"
            >
              <a
                href={item.href ?? "#"}
                className="group block"
                aria-label={item.title}
              >
                {/* Image */}
                <div
                  className="relative w-full overflow-hidden bg-background"
                  style={{ aspectRatio: "1 / 1.1" }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="200px"
                  />
                </div>
                {/* Title */}
                {item.title && (
                  <p className="mt-1.5 text-[12px] leading-snug text-neutral-700 line-clamp-2 text-center">
                    {item.title}
                  </p>
                )}
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows — positioned at the vertical mid-point of the image area */}
        <CarouselPrevious
          className="
            -left-4
            h-9 w-9
            border border-neutral-200 bg-white shadow-md
            hover:bg-neutral-50 hover:border-neutral-300
            text-neutral-600 hover:text-neutral-900
            transition-all duration-150
            disabled:opacity-0
          "
        />
        <CarouselNext
          className="
            -right-4
            h-9 w-9
            border border-neutral-200 bg-white shadow-md
            hover:bg-neutral-50 hover:border-neutral-300
            text-neutral-600 hover:text-neutral-900
            transition-all duration-150
            disabled:opacity-0
          "
        />
      </Carousel>
    </Reveal>
  );
}
