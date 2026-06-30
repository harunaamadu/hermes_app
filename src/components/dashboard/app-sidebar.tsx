"use client";

import * as React from "react";

import { NavMain, NavProjects, NavUser } from "@/components/dashboard";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DashboardSquare02Icon,
  Settings03Icon,
  ShoppingBagCheckIcon,
  ShoppingCartCheckIn02Icon,
  Store02Icon,
  TagsIcon,
  UserQuestion01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { getInitials } from "../header/ui/AccountButton";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: DashboardSquare02Icon,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingCartCheckIn02Icon,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: TagsIcon,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings03Icon,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  salesChannel: [
    {
      name: "Online Store",
      url: "#",
      icon: Store02Icon,
    },
    {
      name: "Point of Sales",
      url: "#",
      icon: ShoppingBagCheckIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();

  if (status === "unauthenticated" || !session?.user) {
    return (
      <Button variant="ghost" size="icon-lg" asChild>
        <Link href="/login">
          <HugeiconsIcon
            icon={UserQuestion01Icon}
            size={16}
            color="currentColor"
            strokeWidth={2}
          />
        </Link>
      </Button>
    );
  }

  const { name, email, image } = session.user;
  const initials = getInitials(name, email);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link
          href="/"
          className="font-heading font-semibold text-xl md:text-2xl flex group-data-[state=collapsed]:items-center group-data-[state=collapsed]:justify-center"
        >
          <span className="group-data-[state=collapsed]:max-w-0 group-data-[state=expanded]:max-w-full transition-all duration-200 inline-block origin-left overflow-hidden">
            Hermes
          </span>

          <span className="group-data-[state=collapsed]:scale-100 group-data-[state=expanded]:scale-0 transition-transform duration-200 inline-block origin-left">
            H
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects salesChannel={data.salesChannel} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: session.user.name ?? "User",
            email: session.user.email ?? "",
            avatar: session.user.image ?? "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
