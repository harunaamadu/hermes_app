import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/product";

interface CategoryTileProps {
  category: Category;
  className?: string;
}

export function CategoryTile({ category, className }: CategoryTileProps) {
  return (
    <Link
      href={category.href ?? `/category/${category.slug}`}
      className={cn(
        "group flex flex-col gap-3 rounded-xl border bg-card p-4 transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 768px) 50vw, 16vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{category.title}</span>
        <span className="text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Shop now
        </span>
      </div>
    </Link>
  );
}