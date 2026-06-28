import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full flex-col gap-3 border bg-card p-3", className)}>
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="h-3.5 w-3/4" />
      <Skeleton className="h-3.5 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="mt-auto h-8 w-full rounded-md" />
    </div>
  );
}