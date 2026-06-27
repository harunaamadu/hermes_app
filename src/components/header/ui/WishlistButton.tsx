"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import NavBadge from "./NavBadge";
import Link from "next/link";

const WishlistButton = () => {
  const [count] = useState(100);

  return (
    <div className="relative">
      <Button variant={"ghost"} size={"icon-lg"}>
        <HugeiconsIcon
          icon={FavouriteIcon}
          size={16}
          color="currentColor"
          strokeWidth={2}
        />

        <Link href={`/wishlist`} className="absolute inset-0" />
      </Button>

      <NavBadge variant={"count"} count={count} />
    </div>
  );
};

export default WishlistButton;
