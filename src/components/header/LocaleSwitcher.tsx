"use client";

import { useState } from "react";
import { useLocaleStore } from "@/store/useLocaleStore";
import LocaleDialog from "./ui/LocaleDialog";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, MapPinHouseIcon } from "@hugeicons/core-free-icons";

export default function LocaleSwitcher() {
  const [open, setOpen] = useState(false);
  const country = useLocaleStore((s) => s.country);
  const currency = useLocaleStore((s) => s.currency);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex shrink-0 items-center gap-1 text-accent/60 transition-colors hover:text-[#F6F3EC]"
      >
        <HugeiconsIcon
          icon={MapPinHouseIcon}
          size={14}
          color="currentColor"
          strokeWidth={1.5}
        />
        <span className="flex items-center gap-2">
          {country.flag} <span className="text-accent">{country.name}</span> · {currency.code}
        </span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={12}
          color="currentColor"
          strokeWidth={1.5}
        />
      </button>
      <LocaleDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
