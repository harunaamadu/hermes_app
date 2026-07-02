export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-30";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const writeToken = process.env.SANITY_API_WRITE_TOKEN || "";

export const isSanityConfigured = Boolean(projectId && dataset);

if (!isSanityConfigured && typeof window === "undefined") {
  // Server-side only warning — keeps client bundles free of this string
  // and avoids spamming the browser console on every page.
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET are not set. " +
      "Product and category data will be empty until you add them to .env.local. " +
      "See SANITY_SETUP.md.",
  );
}

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
