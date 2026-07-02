import { defineArrayMember, defineField, defineType } from "sanity";
import { PackageIcon } from "@sanity/icons";

const BADGE_OPTIONS = [
  { title: "Best seller", value: "best-seller" },
  { title: "New", value: "new" },
  { title: "Sale", value: "sale" },
  { title: "Limited", value: "limited" },
  { title: "Prime", value: "prime" },
  { title: "Hot", value: "hot" },
];

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "pricing", title: "Pricing & stock" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "details",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      group: "details",
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      group: "details",
      options: { list: BADGE_OPTIONS, layout: "dropdown" },
    }),
    defineField({
      name: "isTrending",
      title: "Trending",
      description: "Surfaces this product in \"Recommended for you\".",
      type: "boolean",
      group: "details",
      initialValue: false,
    }),

    defineField({
      name: "image",
      title: "Main image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      group: "pricing",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "originalPrice",
      title: "Original price",
      description: "Set this to show a strikethrough discount.",
      type: "number",
      group: "pricing",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency symbol",
      type: "string",
      group: "pricing",
      initialValue: "$",
    }),
    defineField({
      name: "inStock",
      title: "In stock",
      type: "boolean",
      group: "pricing",
      initialValue: true,
    }),
    defineField({
      name: "stockCount",
      title: "Stock count",
      type: "number",
      group: "pricing",
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "freeShipping",
      title: "Free shipping",
      type: "boolean",
      group: "pricing",
      initialValue: false,
    }),
    defineField({
      name: "deliveryDays",
      title: "Delivery days",
      type: "number",
      group: "pricing",
    }),
    defineField({
      name: "sold",
      title: "Units sold",
      type: "number",
      group: "pricing",
      initialValue: 0,
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      group: "pricing",
      initialValue: 0,
      validation: (rule) => rule.min(0).max(5),
    }),
    defineField({
      name: "reviewCount",
      title: "Review count",
      type: "number",
      group: "pricing",
      initialValue: 0,
    }),

    defineField({
      name: "variants",
      title: "Variants",
      description: "E.g. Size: M, Color: Black.",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          name: "variant",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "value", type: "string", title: "Value" }),
            defineField({
              name: "inStock",
              type: "boolean",
              title: "In stock",
              initialValue: true,
            }),
          ],
          preview: {
            select: { label: "label", value: "value" },
            prepare({ label, value }) {
              return { title: `${label}: ${value}` };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "price",
      currency: "currency",
    },
    prepare({ title, media, subtitle, currency }) {
      return {
        title,
        media,
        subtitle:
          subtitle !== undefined ? `${currency ?? "$"}${subtitle}` : "",
      };
    },
  },
});