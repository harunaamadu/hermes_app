"use client";

import { useSession, signOut } from "next-auth/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserQuestion01Icon, Loading01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function getInitials(name?: string | null, email?: string | null) {
  const source = name?.trim() || email?.trim() || "";
  if (!source) return "?";
  const parts = source.split(/\s+/);
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

const AccountButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button variant="ghost" size="icon-lg">
        <HugeiconsIcon
          icon={Loading01Icon}
          size={16}
          color="currentColor"
          strokeWidth={2}
          className="animate-spin-pause"
        />
      </Button>
    );
  }

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="hover:bg-transparent!"
        >
          <Avatar className="size-7 hover:cursor-pointer">
            {image && (
              <AvatarImage src={image} alt={name ?? email ?? "Account"} />
            )}
            <AvatarFallback>{initials}</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-3 min-w-42.5" align="center">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="truncate">
            {name ?? email}
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/account">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-1.5" />
        <DropdownMenuItem asChild>
          <Link href="/social">Social Media</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/support">Support</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1.5" />
        <DropdownMenuItem
          className="text-rose-500"
          onSelect={(e) => {
            e.preventDefault();
            signOut({ callbackUrl: "/" });
          }}
        >
          Sign out
        </DropdownMenuItem>
        {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountButton;