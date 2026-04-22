import { defineType, defineField } from "sanity";

export const skill = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon Key",
      type: "string",
      description:
        "Icon identifier mapped in code (e.g. react, nextjs, typescript, tailwind, vite, figma, briefcase, pencil, clipboard, users, dnd, vinyl)",
    }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "text",
      description: "Detailed description shown when the skill card is expanded",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Tech Stack", value: "tech" },
          { title: "Beyond Code", value: "beyond" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Sort order within category (lower = first)",
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
      title: "label",
      subtitle: "category",
    },
  },
});
