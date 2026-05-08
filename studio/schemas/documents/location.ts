import { TreePine } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "location",
  title: "Location / Stage",
  type: "document",
  icon: TreePine,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Stable identifier for this location or stage.",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (!slug?.current) {
            return "Slug is required.";
          }

          if (!/^[a-z0-9-]+$/.test(slug.current)) {
            return "Slug must use lowercase Latin letters, numbers, and hyphens only.";
          }

          return true;
        }),
    }),
    defineField({
      name: "stageType",
      title: "Stage Type",
      type: "string",
      description: "Use Epic for locations that need the special epic-stage treatment.",
      options: {
        list: [
          { title: "Main", value: "main" },
          { title: "Acoustic", value: "acoustic" },
          { title: "Workshop", value: "workshop" },
          { title: "Epic", value: "epic" },
          { title: "Other", value: "other" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required().warning("Alt text improves accessibility and SEO."),
        }),
      ],
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "mapUrl",
      title: "Map URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    orderRankField({ type: "location" }),
  ],
  preview: {
    select: {
      title: "name",
      stageType: "stageType",
      media: "image",
    },
    prepare({ title, stageType, media }) {
      return {
        title: title || "Untitled location",
        subtitle: stageType,
        media,
      };
    },
  },
});
