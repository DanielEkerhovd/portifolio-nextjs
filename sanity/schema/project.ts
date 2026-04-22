import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "string",
      description: "One-line summary shown on the project card",
    }),
    defineField({
      name: "details",
      title: "Details",
      type: "text",
      description: "Full description shown in the detail panel",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      description: 'Project URL. Leave empty or use "#" for "Coming soon"',
      validation: (Rule) =>
        Rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      description:
        "Small preview shown on the project card. Recommended: 600×400 px (3:2 landscape).",
      options: { hotspot: true },
    }),
    defineField({
      name: "cover",
      title: "Cover Image",
      type: "image",
      description:
        "Large image shown in the detail panel. Recommended: 1200×630 px (≈1.9:1 landscape).",
      options: { hotspot: true },
    }),
    defineField({
      name: "accent",
      title: "Accent Gradient",
      type: "string",
      description:
        'Tailwind gradient classes used as fallback when no image, e.g. "from-secondary/60 to-secondary/30"',
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "icon",
              title: "Icon Key",
              type: "string",
              description:
                "Icon identifier mapped in code (e.g. react, nextjs, typescript, tailwind, vite, figma, stripe, d3, code, chart, cube)",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "icon",
            },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Sort order (lower = first)",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
