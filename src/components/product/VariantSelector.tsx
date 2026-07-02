"use client";

import { useMemo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ColorsIcon,
  RulerIcon,
  Tag01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import type { HugeIconData, ProductVariant } from "@/types/product";
import { Button } from "../ui/button";

// Sanity's `variant.value` is free text (no dedicated hex/swatch field),
// so this is a best-effort name -> color map for the common cases. Any
// value not listed here just falls back to a plain text chip, same as a
// size option — nothing breaks, it just isn't rendered as a swatch.
const COLOR_SWATCHES: Record<string, string> = {
  black: "#0a0a0a",
  white: "#ffffff",
  ivory: "#fffff0",
  cream: "#f5f0e6",
  beige: "#e8dcc8",
  tan: "#d2b48c",
  brown: "#5c4433",
  camel: "#c19a6b",
  grey: "#8a8a8a",
  gray: "#8a8a8a",
  charcoal: "#36454f",
  navy: "#1b2a4a",
  blue: "#2f5ea8",
  "sky blue": "#87ceeb",
  teal: "#1f7a72",
  green: "#3a6b35",
  olive: "#6b6b3a",
  khaki: "#c3b091",
  red: "#b3312c",
  burgundy: "#6d1b2c",
  maroon: "#6d1b2c",
  pink: "#e8a0b4",
  blush: "#f4c2c2",
  purple: "#6a4a8f",
  lavender: "#b19cd9",
  yellow: "#e8c547",
  mustard: "#c9a227",
  gold: "#c9a227",
  orange: "#d9772f",
  rust: "#a5522d",
  silver: "#c0c0c0",
};

const LIGHT_SWATCHES = new Set(["#ffffff", "#fffff0", "#f5f0e6", "#e8dcc8"]);

function resolveSwatch(value: string) {
  return COLOR_SWATCHES[value.trim().toLowerCase()];
}

function iconForLabel(label: string): HugeIconData {
  const normalized = label.trim().toLowerCase();
  if (normalized.includes("colour") || normalized.includes("color"))
    return ColorsIcon;
  if (normalized.includes("size")) return RulerIcon;
  return Tag01Icon;
}

/** Groups a flat variant list by label, e.g. all "Size" entries together, all "Color" entries together. Order of first appearance is preserved. */
export function groupVariantsByLabel(variants: ProductVariant[]) {
  const byLabel = new Map<string, ProductVariant[]>();
  for (const v of variants) {
    const list = byLabel.get(v.label) ?? [];
    list.push(v);
    byLabel.set(v.label, list);
  }
  return Array.from(byLabel.entries());
}

/** Default selection: the first in-stock option in each group, mirroring the single-variant version's original "preselect something in stock" behavior — just applied per axis instead of globally. */
export function getDefaultVariantSelection(
  variants: ProductVariant[],
): Record<string, ProductVariant> {
  const selection: Record<string, ProductVariant> = {};
  for (const [label, options] of groupVariantsByLabel(variants)) {
    const preferred = options.find((o) => o.inStock) ?? options[0];
    if (preferred) selection[label] = preferred;
  }
  return selection;
}

export interface VariantSelectorProps {
  variants: ProductVariant[];
  /** Currently selected option per group label, e.g. `{ Size: {...}, Color: {...} }`. */
  selected: Record<string, ProductVariant | undefined>;
  onSelect: (label: string, variant: ProductVariant) => void;
  /** Show skeleton placeholders instead of real options (e.g. while variant availability is still being fetched or revalidated after an edit). */
  loading?: boolean;
  /** Only show the "please select" message for a group after the shopper has tried to act (e.g. clicked Add to Cart) — avoids flashing errors on first render. */
  showValidation?: boolean;
  className?: string;
}

export function VariantSelector({
  variants,
  selected,
  onSelect,
  loading = false,
  showValidation = false,
  className,
}: VariantSelectorProps) {
  const groups = useMemo(() => groupVariantsByLabel(variants), [variants]);

  if (loading) return <VariantSelectorSkeleton className={className} />;
  if (groups.length === 0) return null;

  return (
    <div className={cn("flex gap-4", className)}>
      {groups.map(([label, options]) => {
        const icon = iconForLabel(label);
        const isColorGroup = icon === ColorsIcon;
        const activeValue = selected[label]?.value;

        return (
          <div key={label} className="flex flex-col gap-2">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
              <HugeiconsIcon icon={icon} size={14} strokeWidth={2} />
              {label}
              {activeValue && (
                <span className="font-normal normal-case text-muted-foreground">
                  · {activeValue}
                </span>
              )}
            </p>

            <div className="flex flex-wrap gap-2">
              {options.map((v) => {
                const isActive = activeValue === v.value;
                const swatch = isColorGroup
                  ? resolveSwatch(v.value)
                  : undefined;

                if (swatch) {
                  return (
                    <button
                      key={v.value}
                      type="button"
                      disabled={!v.inStock}
                      onClick={() => onSelect(label, v)}
                      aria-pressed={isActive}
                      aria-label={v.value}
                      title={v.value}
                      className={cn(
                        "relative flex size-9 items-center justify-center rounded-full border transition-all",
                        isActive
                          ? "border-foreground ring-2 ring-foreground ring-offset-2 ring-offset-background"
                          : "border-border hover:border-foreground",
                        !v.inStock && "cursor-not-allowed opacity-40",
                      )}
                    >
                      <span
                        className="size-6 rounded-full ring-1 ring-black/10"
                        style={{ backgroundColor: swatch }}
                      />
                      {isActive && (
                        <HugeiconsIcon
                          icon={Tick02Icon}
                          size={12}
                          strokeWidth={3}
                          className={cn(
                            "absolute",
                            LIGHT_SWATCHES.has(swatch)
                              ? "text-foreground"
                              : "text-background",
                          )}
                        />
                      )}
                    </button>
                  );
                }

                return (
                  <Button
                    variant={isActive ? "default" : "outline"}
                    key={v.value}
                    type="button"
                    disabled={!v.inStock}
                    onClick={() => onSelect(label, v)}
                    aria-pressed={isActive}
                    className={cn(
                      "min-w-11 border px-3 py-2 text-xs font-medium uppercase tracking-wide transition-colors",
                      isActive
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-foreground hover:border-foreground",
                      !v.inStock &&
                        "cursor-not-allowed border-border/40 text-muted-foreground/50 line-through",
                    )}
                  >
                    {v.value}
                  </Button>
                );
              })}
            </div>

            {showValidation && !activeValue && (
              <p className="text-xs text-destructive">
                Please select a {label.toLowerCase()}.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function VariantSelectorSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-col gap-4", className)}
      aria-live="polite"
      aria-busy="true"
    >
      {[0, 1].map((row) => (
        <div key={row} className="flex flex-col gap-2">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Spinner className="size-3.5" />
            Loading options…
          </p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: row === 0 ? 4 : 5 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "animate-pulse bg-muted",
                  row === 0 ? "size-9 rounded-full" : "h-9 w-12",
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
