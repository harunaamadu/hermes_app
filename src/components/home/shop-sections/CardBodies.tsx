"use client";

import { ShopSectionData } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

// ─── Shared image tile ─────────────────────────────────────────────────────────

function Tile({
  image,
  title,
  href,
  className = "",
}: {
  image: string;
  title: string;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href ?? "#"}
      className={`group block overflow-hidden ${className}`}
    >
      <div className="relative overflow-hidden bg-neutral-100 aspect-square">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />
      </div>
      <p className="mt-1.5 text-[13px] leading-snug text-neutral-700 line-clamp-2">
        {title}
      </p>
    </Link>
  );
}

// ─── Variant: 2×2 product grid ─────────────────────────────────────────────────

export function Grid2x2Body({ data }: { data: ShopSectionData }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {data.items.slice(0, 4).map((item) => (
        <Tile key={item.id} image={item.image} title={item.title} href={item.href} />
      ))}
    </div>
  );
}

// ─── Variant: large hero image fills the card ──────────────────────────────────

export function FeaturedLargeBody({ data }: { data: ShopSectionData }) {
  const item = data.items[0];
  if (!item) return null;
  return (
    <a href={item.href ?? "#"} className="group block overflow-hidden">
      <div className="relative w-full overflow-hidden bg-neutral-100" style={{ aspectRatio: "3/3.5" }}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    </a>
  );
}

// ─── Variant: one large hero + 3 small subcategories ──────────────────────────

export function HeroSubcategoriesBody({ data }: { data: ShopSectionData }) {
  const [hero, ...subs] = data.items;
  if (!hero) return null;
  return (
    <div className="flex flex-col gap-3">
      {/* Hero */}
      <a href={hero.href ?? "#"} className="group block overflow-hidden">
        <div className="relative w-full overflow-hidden bg-neutral-100" style={{ aspectRatio: "16/9" }}>
          <Image
            src={hero.image}
            alt={hero.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <p className="mt-1.5 text-[13px] leading-snug text-neutral-700">{hero.title}</p>
      </a>
      {/* Sub-tiles */}
      <div className="grid grid-cols-3 gap-3">
        {subs.slice(0, 3).map((item) => (
          <Tile key={item.id} image={item.image} title={item.title} href={item.href} />
        ))}
      </div>
    </div>
  );
}

// ─── Variant: 2×2 category tiles with labels ──────────────────────────────────

export function Subcategory2x2Body({ data }: { data: ShopSectionData }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {data.items.slice(0, 4).map((item) => (
        <Tile key={item.id} image={item.image} title={item.title} href={item.href} />
      ))}
    </div>
  );
}