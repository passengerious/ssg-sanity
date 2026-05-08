import { Music } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "artist",
  title: "Artist",
  type: "document",
  icon: Music,
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
      description: "Stable identifier for this artist.",
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
      name: "photo",
      title: "Photo",
      type: "image",
      description: "Optional for MVP so content entry is not blocked by missing promo assets.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required().warning("Alt text improves accessibility when a photo is used."),
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: "genre",
      title: "Genre",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      description: "Official website, social profile, or related ticket link.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    orderRankField({ type: "artist" }),
  ],
  preview: {
    select: {
      title: "name",
      genre: "genre",
      media: "photo",
    },
    prepare({ title, genre, media }) {
      return {
        title: title || "Untitled artist",
        subtitle: genre,
        media,
      };
    },
  },
});
