"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/tabs";
import { useHeaderPanelStore } from "@/store/useHeaderPanelStore";
import { useUserStore } from "@/store/useUserStore";
import LocaleSwitcher from "../LocaleSwitcher";
import { NAVLINKS } from "@/lib/constants";
import NavSettings from "./NavSettings";

type PanelTab = "menu" | "categories" | "settings";

const MENU_LINKS = [
  { href: "/account/orders", label: "Track order" },
  { href: "/help", label: "Help center" },
  { href: "/contact", label: "Contact us" },
];

const CATEGORY_LINKS = [
  { href: "/products?category=electronics", label: "Electronics" },
  { href: "/products?category=fashion", label: "Fashion" },
  { href: "/products?category=home", label: "Home & Living" },
  { href: "/products?category=beauty", label: "Beauty" },
  { href: "/products?category=deals", label: "Deals" },
];

const MobileMenuPanel = () => {
  const activePanel = useHeaderPanelStore((s) => s.activePanel);
  const openPanel = useHeaderPanelStore((s) => s.openPanel);
  const user = useUserStore((s) => s.user);

  // "menu" and "categories" both open this same sheet — only the starting tab differs.
  const open = activePanel === "menu" || activePanel === "categories";
  const [tab, setTab] = useState<PanelTab>("menu");

  // Default to whichever trigger opened the panel, each time it (re)opens.
  useEffect(() => {
    if (activePanel === "menu" || activePanel === "categories") {
      setTab(activePanel);
    }
  }, [activePanel]);

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => openPanel(next ? activePanel : null)}
    >
      <SheetContent side="left" className="max-[475px]:min-w-full p-0 z-102">
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle className="font-heading tracking-[0.08em]">
            HERMES
          </SheetTitle>
        </SheetHeader>

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as PanelTab)}
          className="flex h-full flex-col"
        >
          <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="menu"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:shadow-none"
            >
              Menu
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:shadow-none"
            >
              Categories
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:shadow-none"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="menu"
            className="flex-1 overflow-y-auto px-4 py-4"
          >
            <nav className="flex flex-col">
              {NAVLINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => openPanel(null)}
                  className="border-b py-3 text-sm transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              {MENU_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => openPanel(null)}
                  className="not-last:border-b py-3 text-sm transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href={user ? "/account" : "/login"}
              onClick={() => openPanel(null)}
              className="mt-4 block rounded-full bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              {user ? "Your account" : "Sign in"}
            </Link>
          </TabsContent>

          <TabsContent
            value="categories"
            className="flex-1 overflow-y-auto px-4 py-4"
          >
            <nav className="flex flex-col">
              {CATEGORY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => openPanel(null)}
                  className="not-last:border-b py-3 text-sm transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </TabsContent>

          <TabsContent
            value="settings"
            className="flex-1 overflow-y-auto px-4 py-4"
          >
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Location &amp; currency
              </p>
              <LocaleSwitcher
                className="text-foreground/80!"
                spanColor="text-foreground!"
                isMobile
              />
            </div>

            <NavSettings />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuPanel;
