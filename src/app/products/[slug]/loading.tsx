// src/app/products/[slug]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="mx-auto grid w-full max-w-360 grid-cols-1 gap-10 px-4 py-10 md:px-6 lg:grid-cols-2 lg:px-8">
      <Skeleton className="aspect-3/4 w-full" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-11 w-full" />
      </div>
    </div>
  );
}