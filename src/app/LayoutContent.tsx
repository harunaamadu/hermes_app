"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideHeader = [
    "/login",
    "/register",
    "/checkout",
    "/dashboard",
  ].includes(pathname);

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
}