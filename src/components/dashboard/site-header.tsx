"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Notification01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useSession } from "next-auth/react";
import { getTimeGreeting, ROLE_SCOPE } from "@/types";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

// Replace with real data (e.g. from a Prisma `Notification` model + an API/server action).
const notifications: Notification[] = [
  {
    id: "1",
    title: "Order shipped",
    description: "Your order #1042 is on its way.",
    time: "2h ago",
    read: false,
  },
  {
    id: "2",
    title: "Price drop",
    description: "An item in your wishlist just went on sale.",
    time: "1d ago",
    read: false,
  },
  {
    id: "3",
    title: "Welcome to Hermès",
    description: "Your account was created successfully.",
    time: "3d ago",
    read: true,
  },
];

export function SiteHeader() {
  const [items, setItems] = useState(notifications);
  const unreadCount = items.filter((n) => !n.read).length;

  const { data: session } = useSession();

  const [greeting, setGreeting] = useState<string | null>(null);
  useEffect(() => {
    setGreeting(getTimeGreeting(new Date().getHours()));
  }, []);

  const firstName = session?.user?.name?.split(" ")[0];
  const scope = ROLE_SCOPE[(session?.user as any)?.role ?? "CUSTOMER"];

  function markAllAsRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-5 my-auto"
        />
        <div>
          <h1 className="text-base font-medium">
            {greeting ?? "Welcome"}
            {firstName ? `, ${firstName}` : ""}!
          </h1>
          <p className="text-xs text-muted-foreground/80 mt-0.75">
            Here's what's happening with your {scope} today
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <HugeiconsIcon
                  icon={Notification01Icon}
                  size={20}
                  color="currentColor"
                  strokeWidth={1.5}
                />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 size-4.5 justify-center rounded-full p-0 text-[10px] tabular-nums"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80 p-0">
              <div className="flex items-center justify-between px-3 py-2.5">
                <DropdownMenuLabel className="p-0 text-sm font-medium">
                  Notifications
                </DropdownMenuLabel>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <DropdownMenuSeparator className="m-0" />

              {items.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  You're all caught up.
                </p>
              ) : (
                <ScrollArea className="max-h-80">
                  {items.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex items-start gap-2 px-3 py-2.5"
                    >
                      <span
                        className={`mt-1.5 size-1.5 shrink-0 rounded-full ${
                          notification.read ? "bg-transparent" : "bg-blue-500"
                        }`}
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium">
                          {notification.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {notification.description}
                        </span>
                        <span className="text-xs text-muted-foreground/70">
                          {notification.time}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
