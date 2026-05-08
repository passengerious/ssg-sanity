import { HeartHandshake } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  icon: HeartHandshake,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Optional stable identifier for this partner.",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.custom((slug) => {
          if (!slug?.current) {
            return true;
          }

          if (!/^[a-z0-9-]+$/.test(slug.current)) {
            return "Slug must use lowercase Latin letters, numbers, and hyphens only.";
          }

          return true;
        }),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required().error("Partner logo alt text is required."),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "level",
      title: "Partnership Level",
      type: "string",
      options: {
        list: [
          { title: "Title", value: "title" },
          { title: "Gold", value: "gold" },
          { title: "Silver", value: "silver" },
          { title: "Bronze", value: "bronze" },
          { title: "Media", value: "media" },
          { title: "Friend", value: "friend" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({ type: "partner" }),
  ],
  preview: {
    select: {
      title: "name",
      level: "level",
      media: "logo",
    },
    prepare({ title, level, media }) {
      return {
        title: title || "Untitled partner",
        subtitle: level,
        media,
      };
    },
  },
});
