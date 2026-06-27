"use client";

import React from "react";
import { Button } from "../../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingCart02Icon } from "@hugeicons/core-free-icons";
import NavBadge from "./NavBadge";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

const CartButton = () => {
  const count = useCartStore((s) => s.itemCount());

  return (
    <div className="relative">
      <Button variant={"ghost"} size={"icon-lg"}>
        <HugeiconsIcon
          icon={ShoppingCart02Icon}
          size={16}
          color="currentColor"
          strokeWidth={2}
        />
        <Link href={`/cart`} className="absolute inset-0" />
      </Button>

      <NavBadge variant={"count"} count={count} />
    </div>
  );
};

export default CartButton;