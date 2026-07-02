"use server"

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// Note: catalog reads (products, categories) used to live here, backed by
// Prisma's Product/Category models. They were removed — the catalog is
// now managed in Sanity and read through src/sanity/fetch.ts instead. This
// file's Prisma queries had also drifted out of sync with schema.prisma
// (isArchived, compareAt, images.order, variants.color don't exist on the
// current models), so nothing here was safe to keep as-is.
//
// The Prisma Product/Category/ProductImage/ProductVariant models in
// schema.prisma are now only exercised via Order/Review/Wishlist/Cart
// relations — if you don't need those to enforce referential integrity
// against a real product row, they're candidates to simplify away too.

// ! Actions

// ******* Auth Action *******
export async function loginWithCredentials(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid email or password");
        default:
          throw new Error("Something went wrong");
      }
    }
    throw error;
  }
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}