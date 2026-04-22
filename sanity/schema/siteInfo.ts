import { defineType, defineField } from "sanity";

export const siteInfo = defineType({
  name: "siteInfo",
  title: "Site Info",
  type: "document",
  fields: [
    defineField({
      name: "welcomeText",
      title: "Welcome Text",
      type: "string",
      description: 'Text above the name, e.g. "Welcome to the portifolio of"',
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: 'e.g. "Frontend Developer"',
    }),
    defineField({
      name: "shortDescriptions",
      title: "Short Descriptions",
      type: "array",
      description: "Brief intro lines shown in the default (collapsed) view",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "longDescriptions",
      title: "Long Descriptions",
      type: "array",
      description: "Extended bio paragraphs shown when the hero card is expanded",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "contacts",
      title: "Contact Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Email", value: "email" },
                  { title: "GitHub", value: "github" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Phone", value: "phone" },
                ],
              },
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Display text for the contact link",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description: "Full URL or mailto:/tel: link",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "type",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
    },
  },
});
