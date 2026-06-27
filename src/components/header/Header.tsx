"use client";

import React from "react";
import HeaderAnnouncement from "./HeaderAnnouncement";
import Link from "next/link";
import HeaderNav from "./HeaderNav";
import HeaderActions from "./HeaderActions";
import MobileMenuPanel from "./ui/MobileMenuPanel";
import Reveal from "../animations/Reveal";

const Header = () => {
  return (
    <Reveal direction="down">
      <header className="w-full">
        <HeaderAnnouncement />

        <div className="sticky top-0 flex justify-between xl:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-[280px_1fr_280px] gap-10 items-center w-full p-4 sm:px-6 lg:px-10 max-w-360 mx-auto bg-background text-foreground border-b border-b-border/80">
          <div className="flex items-center gap-3 md:gap-6 self-start">
            <Link
              href="/"
              className="text-xl md:text-2xl font-heading font-semibold relative group"
            >
              Her
              <span className="group-hover:text-primary transition-colors duration-300">
                mes
              </span>
            </Link>
          </div>

          <HeaderNav className="hidden md:flex items-center justify-center" />

          <HeaderActions />
        </div>

        <MobileMenuPanel />
      </header>
    </Reveal>
  );
};

export default Header;