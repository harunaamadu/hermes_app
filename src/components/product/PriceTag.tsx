import { cn } from "@/lib/utils";
import { formatPrice, calcDiscountPercent } from "@/lib/product/format";

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: { whole: "text-lg", fraction: "text-xs", symbol: "text-xs" },
  md: { whole: "text-2xl", fraction: "text-sm", symbol: "text-sm" },
  lg: { whole: "text-3xl", fraction: "text-base", symbol: "text-base" },
};

export function PriceTag({
  price,
  originalPrice,
  currency = "$",
  size = "md",
  className,
}: PriceTagProps) {
  const { whole, fraction } = formatPrice(price);
  const discount = calcDiscountPercent(price, originalPrice);
  const sizes = SIZE_MAP[size];

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2", className)}>
      <div className="flex items-baseline font-semibold text-foreground">
        {discount !== null && (
          <span className={cn(sizes.symbol, "mr-1 self-start font-bold text-red-600")}>
            -{discount}%
          </span>
        )}
        <span className={cn(sizes.symbol, "self-start")}>{currency}</span>
        <span className={sizes.whole}>{whole}</span>
        <span className={cn(sizes.fraction, "self-start")}>{fraction}</span>
      </div>
      {originalPrice && originalPrice > price && (
        <span className="text-sm text-muted-foreground line-through">
          {currency}
          {originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
}