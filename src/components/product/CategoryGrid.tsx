import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category } from "@/types/product";
import { CategoryTile } from "./CategoryTile";

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
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6", className)}>
      {(loading ? Array.from({ length: skeletonCount }) : categories).map((item, index) =>
        loading ? (
          <div key={index} className="flex flex-col gap-3 rounded-xl border bg-card p-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <CategoryTile key={(item as Category).id} category={item as Category} />
        )
      )}
    </div>
  );
}