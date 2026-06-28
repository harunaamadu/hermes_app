"use client";

import { cn } from "@/lib/utils";
import { LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

type CTA = {
  href: string;
  label: string;
};

export type TitleProps = {
  title: string;
  description?: string;
  cta?: CTA;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const titleSizes = {
  xs: "text-sm",
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
};

const TitleBar = ({
  title,
  description,
  cta,
  className,
  size = "md",
}: TitleProps) => {
  return (
    <div
      className={cn(
        "flex justify-between mb-6 first-letter:capitalize",
        description && cta ? "items-end" : "items-center",
        className,
      )}
    >
      <div>
        <h3
          className={cn(
            "font-heading font-bold leading-tight",
            titleSizes[size],
          )}
        >
          {title}
        </h3>

        {description && <p className="font-light text-[9px]">{description}</p>}
      </div>

      {cta && (
        <Link
          href={cta.href}
          className="inline-flex items-center gap-1 text-sm font-medium text-[#007185] hover:underline shrink-0"
        >
          {cta.label}
          <HugeiconsIcon
            icon={LinkSquare02Icon}
            size={14}
            color="currentColor"
            strokeWidth={1.5}
          />
        </Link>
      )}
    </div>
  );
};

export default TitleBar;
