import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  Files,
  BookA,
  User,
  ListCollapse,
  Quote,
  Menu,
  Settings,
  Ticket,
  MapPin,
  TreePine,
  Music,
  HeartHandshake,
} from "lucide-react";

export const structure = (S: any, context: any) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "page",
        title: "Pages",
        icon: Files,
        S,
        context,
      }),
      S.listItem()
        .title("Posts")
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("Post")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }]) // Default ordering
        ),
      orderableDocumentListDeskItem({
        type: "category",
        title: "Categories",
        icon: BookA,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "author",
        title: "Authors",
        icon: User,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "faq",
        title: "FAQs",
        icon: ListCollapse,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "testimonial",
        title: "Testimonials",
        icon: Quote,
        S,
        context,
      }),
      S.divider({ title: "Festival" }),
      orderableDocumentListDeskItem({
        type: "festivalCity",
        title: "Festival Cities",
        icon: MapPin,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "location",
        title: "Locations / Stages",
        icon: TreePine,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "artist",
        title: "Artists",
        icon: Music,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "partner",
        title: "Partners",
        icon: HeartHandshake,
        S,
        context,
      }),
      S.divider({ title: "Global" }),
      S.listItem()
        .title("Navigation")
        .icon(Menu)
        .child(
          S.editor()
            .id("navigation")
            .schemaType("navigation")
            .documentId("navigation")
        ),
      S.listItem()
        .title("Settings")
        .icon(Settings)
        .child(
          S.editor()
            .id("settings")
            .schemaType("settings")
            .documentId("settings")
        ),
      S.listItem()
        .title("Ticket Info")
        .icon(Ticket)
        .child(
          S.editor()
            .id("ticketInfo")
            .schemaType("ticketInfo")
            .documentId("ticketInfo")
        ),
    ]);
