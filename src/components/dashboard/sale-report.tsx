"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "../ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnalyticsDownIcon, AnalyticsUpIcon } from "@hugeicons/core-free-icons";
import CurrencyFormatter from "@/lib/CurrencyFormatter";

type Period = "1d" | "7d" | "30d" | "6m" | "max";

interface PeriodStat {
  total: number; // base-currency amount for the period
  change: number; // base-currency delta vs. the prior period
  changePercent: number;
}

// Replace with real data — e.g. fetched per-period from an API/server action
// keyed by the selected period, rather than computed client-side from a
// single static total.
const STATS: Record<Period, PeriodStat> = {
  "1d": { total: 120, change: 15, changePercent: 14.3 },
  "7d": { total: 840, change: -60, changePercent: -6.7 },
  "30d": { total: 2000, change: 1000, changePercent: 50 },
  "6m": { total: 18400, change: 3200, changePercent: 21 },
  max: { total: 42000, change: 4100, changePercent: 10.8 },
};

const PERIODS: { value: Period; label: string }[] = [
  { value: "1d", label: "1d" },
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" },
  { value: "6m", label: "6m" },
  { value: "max", label: "Max" },
];

export const SaleReport = () => {
  const [period, setPeriod] = useState<Period>("30d");
  const stat = STATS[period];
  const isPositive = stat.change >= 0;

  const changePercentLabel = useMemo(
    () => `${isPositive ? "+" : ""}${stat.changePercent.toFixed(1)}%`,
    [isPositive, stat.changePercent],
  );

  return (
    <Card className="ring-0 md:h-68 md:aspect-square">
      <CardContent>
        <h3 className="font-semibold tabular-nums text-4xl mb-2">
          <CurrencyFormatter amountInBase={stat.total} />
        </h3>
        <p
          className={`inline-flex items-center text-xs ${
            isPositive ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          <HugeiconsIcon
            icon={isPositive ? AnalyticsUpIcon : AnalyticsDownIcon}
            size={16}
            color="currentColor"
            strokeWidth={1.5}
            className="size-4 mr-2"
          />
          <span>
            <CurrencyFormatter amountInBase={Math.abs(stat.change)} />
          </span>
          <span className="ml-1">({changePercentLabel})</span>
        </p>
      </CardContent>

      <CardFooter className="mt-auto">
        <ToggleGroup
          type="single"
          size="sm"
          variant="outline"
          spacing={2}
          value={period}
          onValueChange={(value) => {
            if (value) setPeriod(value as Period);
          }}
        >
          {PERIODS.map(({ value, label }) => (
            <ToggleGroupItem
              key={value}
              value={value}
              aria-label={`Toggle ${label}`}
            >
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardFooter>
    </Card>
  );
};
