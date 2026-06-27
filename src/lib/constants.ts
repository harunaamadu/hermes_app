import { NavItem } from "@/components/header/HeaderNav";

export const NAVLINKS: NavItem[] = [
  { label: "Today's Deal", href: "/" },
  { label: "Gift Cards", href: "/" },
  { label: "Sell", href: "/" },
  { label: "Registry", href: "/" },
  { label: "Customer Service", href: "/" },
];

//****  UTILS    *****************************************
export const stringify = (value: unknown): string => {
    if (typeof value === "string") return value;
    return String(value ?? "");
};

export const slugify = (value: string): string =>
    value
.toLowerCase()
.trim()
.replace(/&/g, "and")
.replace(/[^\w\s-]/g, "")
.replace(/\s+/g, "-");


//****  DEVICE DETECTION    *******************************
export type DeviceType = "mobile" | "tablet" | "desktop";

export const getDeviceType = (): DeviceType => {
  if (typeof window === "undefined") {
    return "desktop";
  }

  const width = window.innerWidth;

  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";

  return "desktop";
};
