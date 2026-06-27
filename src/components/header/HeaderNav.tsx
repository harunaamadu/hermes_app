"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { NAVLINKS } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDeviceType } from "@/hooks/use-device";
import { useHeaderPanelStore } from "@/store/useHeaderPanelStore";
import FadeIn from "@/components/animations/FadeIn";
import StaggerChildren from "@/components/animations/StaggerChildren";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

export interface NavItem {
  label: string;
  href: string;
  dropdown?: NavItem[];
  megaMenu?: {
    title: string;
    links: NavItem[];
  }[];
}

interface HeaderNavProps {
  name?: string;
  links?: NavItem[];
  className?: string;
  isLoading?: boolean;
}

const MORE_BUTTON_WIDTH = 90;
const GAP = 24;

export default function HeaderNav({
  name = "Main Navigation",
  links = NAVLINKS,
  className,
  isLoading = false,
}: HeaderNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [visibleItems, setVisibleItems] = useState<NavItem[]>([]);
  const [overflowItems, setOverflowItems] = useState<NavItem[]>([]);
  const [hasMeasured, setHasMeasured] = useState(false);

  const isMobile = useIsMobile();
  const deviceType = useDeviceType();
  const isMobileDevice = isMobile ?? deviceType === "mobile";

  const activePanel = useHeaderPanelStore((s) => s.activePanel);
  const openPanel = useHeaderPanelStore((s) => s.openPanel);

  const isMoreOpen = activePanel === "more";

  const calculateItems = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const widths = itemRefs.current.map((el) => el?.offsetWidth ?? 0);

    let used = 0;
    let visibleCount = 0;

    for (let i = 0; i < widths.length; i++) {
      const next = widths[i] + (i === 0 ? 0 : GAP);
      if (used + next <= containerWidth) {
        used += next;
        visibleCount++;
      } else {
        break;
      }
    }

    if (visibleCount === links.length) {
      setVisibleItems(links);
      setOverflowItems([]);
      setHasMeasured(true);
      return;
    }

    used = 0;
    visibleCount = 0;

    for (let i = 0; i < widths.length; i++) {
      const next = widths[i] + (i === 0 ? 0 : GAP);
      if (used + next + GAP + MORE_BUTTON_WIDTH <= containerWidth) {
        used += next;
        visibleCount++;
      } else {
        break;
      }
    }

    setVisibleItems(links.slice(0, visibleCount));
    setOverflowItems(links.slice(visibleCount));
    setHasMeasured(true);
  }, [links]);

  useLayoutEffect(() => {
    calculateItems();
  }, [calculateItems]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(calculateItems);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [calculateItems]);

  // Close the "More" panel on Escape
  useEffect(() => {
    if (!isMoreOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        openPanel(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMoreOpen, openPanel]);

  if (isMobileDevice) return null;

  const showSkeleton = isLoading || !hasMeasured;

  return (
    <>
      {/* Hidden measurement container */}
      <div
        ref={measureRef}
        className="pointer-events-none absolute left-0 top-0 -z-50 flex opacity-0"
      >
        {links.map((item, index) => (
          <div
            key={item.label}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="shrink-0 px-2 py-2 whitespace-nowrap"
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* Outer container is now just a positioning context — NOT clipped */}
      <div
        ref={containerRef}
        className={cn("relative w-full", className)}
        aria-label={name}
        aria-busy={showSkeleton}
      >
        {/* overflow-hidden moved here, scoped only to the measured nav row */}
        <nav className="flex items-center gap-6 overflow-hidden">
          {showSkeleton
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-16 rounded-md" />
              ))
            : visibleItems.map((item) => (
                <div key={item.label} className="group relative shrink-0">
                  <Link
                    href={item.href}
                    className="px-2 py-2 whitespace-nowrap transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>

                  {item.dropdown && (
                    <div className="absolute left-0 top-full hidden min-w-48 rounded-md border bg-background shadow-lg group-hover:block">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 hover:bg-muted"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}

                  {item.megaMenu && (
                    <div className="absolute left-0 top-full hidden w-175 rounded-lg border bg-background p-6 shadow-xl group-hover:block">
                      {/* Mega menu */}
                    </div>
                  )}
                </div>
              ))}
        </nav>

        {/* "More" button + panel now live OUTSIDE the overflow-hidden nav,
            so the panel is free to render without being clipped */}
        {!showSkeleton && overflowItems.length > 0 && (
          <div className="ml-6 shrink-0">
            <button
              onClick={() => openPanel(isMoreOpen ? null : "more")}
              className="flex items-center gap-1 px-2 py-2 transition-colors hover:text-primary"
              aria-haspopup="menu"
              aria-expanded={isMoreOpen}
            >
              More
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={12}
                color="currentColor"
                strokeWidth={1.5}
              />
            </button>

            <FadeIn
              show={isMoreOpen}
              className="absolute right-0 top-full z-250 mt-2 min-w-56 border bg-background py-2 shadow-lg"
            >
              <StaggerChildren>
                {overflowItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => openPanel(null)}
                    className="block px-4 py-2 text-sm hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </StaggerChildren>
            </FadeIn>
          </div>
        )}
      </div>
    </>
  );
}
