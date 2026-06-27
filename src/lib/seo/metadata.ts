import type { Metadata } from "next";

export const baseMetadata: Metadata = {
  title: {
    default: "Hermes",
    template: "%s | Hermes",
  },
  description: "Modern e-commerce experience with Hermes.",
};

export const createPageMetadata = (
  title: string,
  description: string
): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Hermes`,
      description,
    },
  };
};