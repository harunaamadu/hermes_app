"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu05Icon } from "@hugeicons/core-free-icons";

const MenuButton = () => {
  return (
    <div className="relative md:hidden">
      <Button variant={"ghost"} size={"icon-lg"}>
        <HugeiconsIcon
          icon={Menu05Icon}
          size={16}
          color="currentColor"
          strokeWidth={2}
        />
      </Button>
    </div>
  );
};

export default MenuButton;
