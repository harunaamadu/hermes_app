import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category } from "@/types/product";
import { CategoryTile } from "./CategoryTile";
import Link from "next/link";

interface CategoryGridProps {
  categories: Category[];
  loading?: boolean;
  skeletonCount?: number;
  className?: string;
}

export function CategoryGrid({
  categories,
  loading = false,
  skeletonCount = 6,
  className,
}: CategoryGridProps) {
  return (
    <div className="group relative p-2 my-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        <div className={cn("grid grid-cols-2 gap-3 group", className)}>
          {(loading ? Array.from({ length: skeletonCount }) : categories).map(
            (item, index) =>
              loading ? (
                <div
                  key={index}
                  className="flex flex-col gap-3 rounded-xl border bg-card p-4"
                >
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ) : (
                <CategoryTile
                  key={(item as Category).id}
                  category={item as Category}
                />
              ),
          )}
        </div>
      </div>

      <Link href={``} className="mt-2 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Shop now
      </Link>
    </div>
  );
}
