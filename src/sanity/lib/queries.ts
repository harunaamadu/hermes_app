// GROQ projections below intentionally shape Sanity documents into the
// exact `Product` / `Category` shapes already consumed by
// src/components/product/* (see src/types/product.ts). That way the UI
// components don't need to change — only where the data comes from does.

const productProjection = /* groq */ `{
  "id": _id,
  name,
  "slug": slug.current,
  brand,
  "category": category->slug.current,
  "categoryId": category->_id,
  "image": {
    "imageUrl": image.asset->url,
    "alt": coalesce(image.alt, name),
    "href": "/products/" + slug.current
  },
  "images": gallery[].asset->url,
  price,
  originalPrice,
  "discountPercent": select(
    defined(originalPrice) && originalPrice > 0 =>
      round((1 - price / originalPrice) * 100),
    null
  ),
  currency,
  "review": { "rating": coalesce(rating, 0), "count": coalesce(reviewCount, 0) },
  badge,
  description,
  variants[]{ label, value, inStock },
  inStock,
  stockCount,
  freeShipping,
  deliveryDays,
  sold,
  isTrending,
  "createdAt": _createdAt,
  "updatedAt": _updatedAt
}`;

export const allCategoriesQuery = /* groq */ `
*[_type == "category"] | order(order asc, title asc) {
  "id": _id,
  "slug": slug.current,
  title,
  "image": image.asset->url,
  "href": "/category/" + slug.current
}`;

export const allProductsQuery = /* groq */ `
*[_type == "product"] | order(_createdAt desc) ${productProjection}`;

export const productsByCategoryQuery = /* groq */ `
*[_type == "product" && category->slug.current == $categorySlug]
  | order(_createdAt desc) ${productProjection}`;

export const dealsQuery = /* groq */ `
*[_type == "product" && defined(originalPrice) && originalPrice > price]
  | order(_createdAt desc) [0...8] ${productProjection}`;

export const bestSellersQuery = /* groq */ `
*[_type == "product" && badge == "best-seller"]
  | order(coalesce(sold, 0) desc) [0...10] ${productProjection}`;

export const recommendedQuery = /* groq */ `
*[_type == "product" && isTrending == true]
  | order(coalesce(rating, 0) desc) [0...8] ${productProjection}`;

export const productBySlugQuery = /* groq */ `
*[_type == "product" && slug.current == $slug][0] ${productProjection}`;

export const relatedProductsQuery = /* groq */ `
*[_type == "product" && category._ref == $categoryId && _id != $excludeId]
  | order(_createdAt desc) [0...4] ${productProjection}`;

// Lightweight "did anything in the catalog change" queries — used by the
// realtime listener (src/hooks/useSanityRealtime.ts) to know which
// mutations to react to.
export const productsListenQuery = /* groq */ `*[_type == "product"]`;
export const categoriesListenQuery = /* groq */ `*[_type == "category"]`;