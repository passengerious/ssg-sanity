import { Ticket } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "ticketInfo",
  title: "Ticket Info",
  type: "document",
  icon: Ticket,
  fields: [
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: "Human-readable ticket price, for example: 999 грн.",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "ticketsLeft",
      title: "Number of tickets left",
      type: "string",
      description: "Human-readable availability text, for example: Перші 300 квитків.",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "boxOfficeUrl",
      title: "Link to external box office",
      type: "url",
      description: "External ticketing service URL. Leave empty until the partner link is confirmed.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https"],
        }).error("Use a valid HTTPS URL when a ticket partner is confirmed."),
    }),
  ],
  preview: {
    select: {
      price: "price",
      ticketsLeft: "ticketsLeft",
    },
    prepare({ price, ticketsLeft }) {
      return {
        title: "Ticket Info",
        subtitle: [price, ticketsLeft].filter(Boolean).join(" · ") || "Configure ticket information",
      };
    },
  },
});
