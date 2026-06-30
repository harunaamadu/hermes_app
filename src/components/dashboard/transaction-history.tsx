"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { HugeiconsIcon } from "@hugeicons/react";
import { Invoice04Icon } from "@hugeicons/core-free-icons";
import CurrencyFormatter from "@/lib/CurrencyFormatter";

export interface Transaction {
  orderId: string;
  item: string;
  date: string; // ISO date
  quantity: number;
  price: number; // base-currency line total
  savings?: number; // base-currency amount saved via discount/coupon
}

// Replace with a real fetch against the Order/OrderItem models — one row
// per OrderItem, joined to its parent Order for orderId + date.
const transactions: Transaction[] = [
  {
    orderId: "ORD-10234",
    item: "Birkin 25 Tote",
    date: "2026-06-21",
    quantity: 1,
    price: 1280,
    savings: 120,
  },
  {
    orderId: "ORD-10198",
    item: "Silk Carré Scarf",
    date: "2026-06-10",
    quantity: 2,
    price: 640,
  },
  {
    orderId: "ORD-10142",
    item: "Leather Belt — Reversible",
    date: "2026-05-28",
    quantity: 1,
    price: 410,
    savings: 40,
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const TransactionHistory = () => {
  const hasTransactions = transactions.length > 0;

  return (
    <Card className="ring-0">
      <CardHeader className="flex flex-col text-start">
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>A record of your recent orders</CardDescription>
      </CardHeader>

      <CardContent>
        {hasTransactions ? (
          <ScrollArea className="h-60 w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Saved</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((t) => (
                  <TableRow key={t.orderId}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/dashboard/orders/${t.orderId}`}
                        className="hover:underline"
                      >
                        {t.orderId}
                      </Link>
                    </TableCell>
                    <TableCell className="max-w-40 truncate">
                      {t.item}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(t.date)}
                    </TableCell>
                    <TableCell className="text-right">
                      {t.quantity}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <CurrencyFormatter amountInBase={t.price} />
                    </TableCell>
                    <TableCell className="text-right">
                      {t.savings ? (
                        <Badge
                          variant="outline"
                          className="text-emerald-500 border-emerald-500/30"
                        >
                          <CurrencyFormatter amountInBase={t.savings} />
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        ) : (
          <Empty className="h-72">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <HugeiconsIcon
                  icon={Invoice04Icon}
                  size={20}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              </EmptyMedia>
              <EmptyTitle>No transactions yet</EmptyTitle>
              <EmptyDescription>
                Orders you place will show up here, along with the date,
                quantity, and any savings from discounts.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild size="sm">
                <Link href="/products">Start shopping</Link>
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
};