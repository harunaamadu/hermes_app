"use client";

import { useEffect, useState } from "react";
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

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

const AccountButton = () => {
  const [status, setStatus] = useState<AuthStatus>("loading");

  // Replace this effect with your actual session check
  // (e.g. useSession(), a fetch to /api/me, etc.)
  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        // const session = await getSession();
        // if (active) setStatus(session ? "authenticated" : "unauthenticated");

        // placeholder until real auth is wired in:
        if (active) setStatus("unauthenticated");
      } catch {
        if (active) setStatus("unauthenticated");
      }
    }

    checkSession();
    return () => {
      active = false;
    };
  }, []);

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

  return (
    <div className="relative">
      {status === "unauthenticated" ? (
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
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className="hover:bg-transparent!"
            >
              <Avatar className="size-7 hover:cursor-pointer">
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="p-3 min-w-42.5" align="center">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1.5" />
            <DropdownMenuItem>Social Media</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default AccountButton;
