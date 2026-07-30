import { History } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "festivalMilestone",
  title: "Festival Milestone",
  type: "object",
  icon: History,
  description:
    "An ordered historical milestone in a city's festival narrative. Use approved Ukrainian wording only and cite sources for numerical, financial, or unusual claims.",
  fields: [
    defineField({
      name: "year",
      title: "Year / Range",
      type: "string",
      description:
        "Display year or range, for example: 1987, 1991–1996, or 2022–2024. Keep it short and human-readable.",
      validation: (Rule) => Rule.required().max(24),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Concise Ukrainian milestone label.",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description:
        "Approved Ukrainian wording only. Avoid unsupported superlatives; add a source for numerical, financial, or unusual claims.",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      description:
        "Optional HTTPS link to the approved source. Required by editorial governance for high-risk claims (for example financial figures or superlatives).",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https"],
        }).error("Use a valid HTTPS URL for the source."),
    }),
    defineField({
      name: "sourceLabel",
      title: "Source Label",
      type: "string",
      description:
        "Short label identifying the source for visitors, for example: «Рок Січ» архів. Shown alongside the source link when present.",
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      year: "year",
      title: "title",
      description: "description",
    },
    prepare({ year, title, description }) {
      return {
        title: [year, title].filter(Boolean).join(" — ") || "Untitled milestone",
        subtitle: description,
      };
    },
  },
});