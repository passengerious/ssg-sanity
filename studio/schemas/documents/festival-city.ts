import { MapPin } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineArrayMember, defineField, defineType } from "sanity";
import meta from "../blocks/shared/meta";

export default defineType({
  name: "festivalCity",
  title: "Festival City",
  type: "document",
  icon: MapPin,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "relationships",
      title: "Related Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "Public festival city title, for example: Країна Мрій Епічна.",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "cityName",
      title: "City Name",
      type: "string",
      group: "content",
      description: "Human-readable city name shown on landing cards and city pages.",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      description: "Route segment for the city page. Keep stable after publishing.",
      options: {
        source: "cityName",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (!slug?.current) {
            return "Slug is required to generate the static city route.";
          }

          if (!/^[a-z0-9-]+$/.test(slug.current)) {
            return "Slug must use lowercase Latin letters, numbers, and hyphens only.";
          }

          return true;
        }),
    }),
    defineField({
      name: "themeKey",
      title: "Theme Key",
      type: "string",
      group: "settings",
      description: "Stable theme token used by the landing and city pages.",
      options: {
        list: [
          { title: "Epic", value: "epic" },
          { title: "Heroic", value: "heroic" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "dateRange",
      title: "Date Range",
      type: "string",
      group: "content",
      description: "Human-readable festival dates, for example: 15–17 серпня 2026.",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "content",
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
      name: "description",
      title: "Description",
      type: "text",
      group: "content",
      rows: 4,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "block-content",
      group: "content",
    }),
    defineField({
      name: "locations",
      title: "Locations / Stages",
      type: "array",
      group: "relationships",
      description: "Ordered locations and stages for this city.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "location" }] })],
    }),
    defineField({
      name: "artists",
      title: "Artists",
      type: "array",
      group: "relationships",
      description: "Ordered lineup for this city.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "artist" }] })],
    }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      group: "relationships",
      description: "Ordered partners for this city.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "partner" }] })],
    }),
    defineField({
      name: "ticketUrlOverride",
      title: "City Ticket URL Override",
      type: "url",
      group: "settings",
      description: "Optional city-specific ticketing URL. Leave empty to use global Ticket Info.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https"],
        }).error("Use a valid HTTPS URL."),
    }),
    meta,
    orderRankField({ type: "festivalCity" }),
  ],
  preview: {
    select: {
      title: "title",
      cityName: "cityName",
      themeKey: "themeKey",
      media: "heroImage",
    },
    prepare({ title, cityName, themeKey, media }) {
      return {
        title: title || "Untitled city",
        subtitle: [cityName, themeKey].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
