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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  HeartIcon,
  ShoppingCartAdd01Icon,
} from "@hugeicons/core-free-icons";
import CurrencyFormatter from "@/lib/CurrencyFormatter";

export interface WishlistRow {
  id: string; // product id
  name: string;
  imageUrl: string;
  price: number; // base-currency
  slug: string;
}

// Replace with a real fetch against the WishlistItem model, joined to its
// Product (name, image, price). useWishlistStore currently only tracks
// product IDs client-side — this still needs the product lookup behind it.
const wishlist: WishlistRow[] = [
  {
    id: "p1",
    name: "Cashmere Wrap Coat",
    imageUrl: "/images/products/cashmere-coat.jpg",
    price: 890,
    slug: "cashmere-wrap-coat",
  },
  {
    id: "p2",
    name: "Suede Ankle Boots",
    imageUrl: "/images/products/suede-boots.jpg",
    price: 520,
    slug: "suede-ankle-boots",
  },
];

export const WishlistSection = () => {
  const hasItems = wishlist.length > 0;

  function handleAddToCart(id: string) {
    // TODO: wire to useCartStore / a server action that creates a CartItem
  }

  function handleRemove(id: string) {
    // TODO: wire to useWishlistStore / a deleteWishlistItem server action
  }

  return (
    <Card className="ring-0">
      <CardHeader className="flex flex-col text-start">
        <CardTitle>Wishlist</CardTitle>
        <CardDescription>Saved for later</CardDescription>
      </CardHeader>

      <CardContent>
        {hasItems ? (
          <ScrollArea className="h-60 w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wishlist.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Link
                        href={`/products/${item.slug}`}
                        className="flex items-center gap-3"
                      >
                        <Avatar className="size-10">
                          <AvatarImage
                            src={item.imageUrl}
                            alt={item.name}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {item.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium line-clamp-1 hover:underline">
                            {item.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            <CurrencyFormatter amountInBase={item.price} />
                          </span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleAddToCart(item.id)}
                              aria-label={`Add ${item.name} to cart`}
                            >
                              <HugeiconsIcon
                                icon={ShoppingCartAdd01Icon}
                                size={16}
                                color="currentColor"
                                strokeWidth={1.5}
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Add to cart</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemove(item.id)}
                              aria-label={`Remove ${item.name} from wishlist`}
                              className="text-rose-500 hover:text-rose-500"
                            >
                              <HugeiconsIcon
                                icon={Delete02Icon}
                                size={16}
                                color="currentColor"
                                strokeWidth={1.5}
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Remove</TooltipContent>
                        </Tooltip>
                      </div>
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
                  icon={HeartIcon}
                  size={20}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              </EmptyMedia>
              <EmptyTitle>Your wishlist is empty</EmptyTitle>
              <EmptyDescription>
                Tap the heart icon on any product to save it here for later.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild size="sm">
                <Link href="/products">Browse products</Link>
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
};