"use server"

import { db } from "@/lib/db";
import { signIn } from "@/auth";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

type ProductFilter = "all" | "new" | "sale";

function buildWhere(categorySlug?: string, filter?: ProductFilter) {
  const base: any = { isArchived: false };

  if (categorySlug && categorySlug !== "all") {
    base.category = { slug: categorySlug };
  }

  if (filter === "new") {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    base.createdAt = { gte: thirtyDaysAgo };
  }

  if (filter === "sale") {
    base.compareAt = { not: null };
  }

  return base;
}

export async function getProductBySlug(slug: string) {
  return db.product.findFirst({
    where: { slug, isArchived: false },
    include: {
      images: { orderBy: { order: "asc" } },
      category: true,
      variants: { orderBy: { color: "asc" } },
    },
  });
}

export async function getProductsByCategory(
  categorySlug?: string,
  take = 12,
  skip = 0,
  filter?: ProductFilter,
) {
  return db.product.findMany({
    where: buildWhere(categorySlug, filter),
    orderBy:
      filter === "new"
        ? { createdAt: "desc" }
        : filter === "sale"
          ? { compareAt: "desc" }
          : { createdAt: "desc" },
    take,
    skip,
    include: {
      images: { orderBy: { order: "asc" }, take: 2 },
      category: true,
      variants: true,
    },
  });
}

export async function getProductsCount(
  categorySlug?: string,
  filter?: ProductFilter,
) {
  return db.product.count({
    where: {
      isArchived: false,
      ...(categorySlug && categorySlug !== "all"
        ? { category: { slug: categorySlug } }
        : {}),
    },
  });
}

export async function getRelatedProducts(
  categoryId: string,
  excludeId: string,
) {
  return db.product.findMany({
    where: { categoryId, isArchived: false, id: { not: excludeId } },
    take: 4,
    include: {
      images: { orderBy: { order: "asc" }, take: 2 },
      category: true,
      variants: true,
    },
  });
}

export async function getAllCategories() {
  return db.category.findMany({ orderBy: { name: "asc" } });
}

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