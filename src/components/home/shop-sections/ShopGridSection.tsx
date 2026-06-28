"use client";

import Container from "@/components/common/Container";
import ShopCard from "./ShopCard";
import { shopSectionsData } from "./data";
import type { ShopSectionData } from "@/types/product";

interface ShopSectionsGridProps {
  /** Override with custom data — falls back to built-in sample data */
  sections?: ShopSectionData[];
}

/**
 * ShopSectionsGrid
 *
 * Renders a responsive 1 → 2 → 4 column grid of ShopCards.
 * Cards with variant="carousel" automatically span the full width.
 */
export default function ShopSectionsGrid({
  sections = shopSectionsData,
}: ShopSectionsGridProps) {
  return (
    <Container
      as="section"
      className="min-h-full w-full py-12 "
    >
      <div className="flex flex-col gap-3">
        {/* Collect non-carousel cards into rows of 4, carousels break the flow full-width */}
        {(() => {
          const output: React.ReactNode[] = [];
          let gridBuffer: ShopSectionData[] = [];
          let gridStart = 0;

          const flushGrid = () => {
            if (gridBuffer.length === 0) return;
            output.push(
              <div
                key={`grid-${gridStart}`}
                className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              >
                {gridBuffer.map((section, i) => (
                  <ShopCard key={section.id} data={section} index={i % 4} />
                ))}
              </div>,
            );
            gridBuffer = [];
          };

          sections.forEach((section, i) => {
            if (section.variant === "carousel") {
              flushGrid();
              gridStart = i + 1;
              output.push(
                <div
                  key={section.id}
                  className="w-full overflow-hidden px-2 bg-background shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.11)] transition-shadow duration-300!"
                >
                  <ShopCard data={section} index={0} />
                </div>,
              );
            } else {
              if (gridBuffer.length === 0) gridStart = i;
              gridBuffer.push(section);
            }
          });

          flushGrid();
          return output;
        })()}
      </div>
    </Container>
  );
}
