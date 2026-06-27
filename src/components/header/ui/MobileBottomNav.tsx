"use client";

import SearchButton from "./SearchButton";
import WishlistButton from "./WishlistButton";
import AccountButton from "./AccountButton";
import CartButton from "./CartButton";
import Reveal from "@/components/animations/Reveal";

const MobileBottomNav = () => {
  return (
    <Reveal>
      <div className="hidden max-[425px]:block fixed bottom-0 z-101 inset-x-0 p-4 bg-background shadow-2xl border">
        <nav className="flex items-center justify-evenly">
          {/* Search button */}
          <SearchButton />

          {/* Wishlink button link */}
          <WishlistButton />

          {/* Account button link */}
          <AccountButton />

          {/* Cart button link */}
          <CartButton />
        </nav>
      </div>
    </Reveal>
  );
};

export default MobileBottomNav;
