// Pure variant config — no JSX. Consumed by components/animations/* and any
// component that needs framer-motion variants directly (e.g. Header.tsx).

import { Variants } from "framer-motion";

/**
 * Drives the sticky header's show/hide transition.
 * Deliberately asymmetric: a quick, sharp exit on scroll-down ("dart away"),
 * a slower, smooth entrance on scroll-up ("glide back") — ties the motion
 * to the brand's messenger/speed theme instead of a generic symmetric slide.
 */
export const headerVariants:Variants = {
  visible: {
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  hidden: {
    y: "-100%",
    transition: { duration: 0.25, ease: [0.6, 0, 0.85, 0.2] },
  },
};

/** Simple opacity fade — dropdowns, dialogs, mega menu panels. */
export const fadeVariants:Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18, ease: "easeOut" } },
};

/** Height + opacity collapse — mobile accordion sections, announcement bar. */
export const slideDownVariants:Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Wraps a list so children stagger in — mega menu columns, cart line items. */
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.075 } },
};

/** Individual child item paired with staggerContainer. */
export const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};