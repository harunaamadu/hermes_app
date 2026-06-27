"use client";

import React from "react";
import { Button } from "../../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search02Icon } from "@hugeicons/core-free-icons";

const SearchButton = () => {
  return (
    <div>
      <Button variant={"ghost"} size={"icon-lg"}>
        <HugeiconsIcon
          icon={Search02Icon}
          size={16}
          color="currentColor"
          strokeWidth={2}
        />
      </Button>
    </div>
  );
};

export default SearchButton;
