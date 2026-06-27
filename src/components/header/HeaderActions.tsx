"use client";

import SearchButton from "./ui/SearchButton";
import WishlistButton from "./ui/WishlistButton";
import AccountButton from "./ui/AccountButton";
import CartButton from "./ui/CartButton";
import MenuButton from "./ui/MenuButton";

const HeaderActions = () => {
  return (
    <div className="relative flex items-center justify-end gap-3 md:gap-6">
      <nav className="max-[425px]:hidden flex items-center justify-end gap-3 md:gap-6">
        {/* Search button */}
        <SearchButton />

        {/* Wishlink button link */}
        <WishlistButton />

        {/* Account button link */}
        <AccountButton />

        {/* Cart button link */}
        <CartButton />
      </nav>

      {/* Menu button */}
      <MenuButton />
    </div>
  );
};

export default HeaderActions;
