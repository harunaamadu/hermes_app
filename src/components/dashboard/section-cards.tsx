import { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CurrencyFormatter from "@/lib/CurrencyFormatter";
import {
  ChangeItem,
  DashboardCard,
  ValueFormat,
} from "@/types";
import { AnalyticsUpIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { dashboardCards } from "@/data/dashboard";

export function formatValue(value: number, format: ValueFormat = "number") {
  switch (format) {
    case "currency":
      return <CurrencyFormatter amountInBase={value} />;
    case "percent":
      return `${value > 0 ? "+" : ""}${value}%`;
    case "rating":
      return value.toFixed(1);
    case "number":
    default:
      return value.toLocaleString();
  }
}

export function formatChange(
  change: DashboardCard["change"],
  cardFormat?: ValueFormat,
): React.ReactNode {
  if (typeof change === "string") return change;

  return change.map((c: ChangeItem, i: number) => (
    <Fragment key={`${c.label}-${i}`}>
      {i > 0 && ", "}
      {formatValue(c.value, c.format ?? cardFormat)} {c.label}
    </Fragment>
  ));
}

export const role: "CUSTOMER" | "SELLER" | "ADMIN" = "CUSTOMER";

export function SectionCards() {
  const roleCards = dashboardCards[role];

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-4">
      {roleCards.map((card) => {
        const changeText = formatChange(card.change, card.format);

        return (
          <Card
            key={card.title}
            className="aspect-video justify-center bg-muted/50"
          >
            <CardHeader>
              <CardDescription>{card.description}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {formatValue(card.value, card.format)}
              </CardTitle>
              <CardAction>
                <Badge variant="outline" className="p-3!">
                  <HugeiconsIcon
                    icon={AnalyticsUpIcon}
                    size={20}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                  {changeText}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {card.title}{" "}
                <HugeiconsIcon
                  icon={AnalyticsUpIcon}
                  size={16}
                  color="currentColor"
                  strokeWidth={1.5}
                  className="size-4"
                />
              </div>
              <div className="text-muted-foreground">{changeText}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
