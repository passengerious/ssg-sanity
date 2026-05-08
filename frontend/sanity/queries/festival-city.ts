import { groq } from "next-sanity";
import { bodyQuery } from "./shared/body";
import { imageQuery } from "./shared/image";
import { metaQuery } from "./shared/meta";

export const FESTIVAL_CITIES_SLUGS_QUERY = groq`
  *[_type == "festivalCity" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const FESTIVAL_CITY_QUERY = groq`
  *[_type == "festivalCity" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    cityName,
    slug,
    themeKey,
    tagline,
    dateRange,
    description,
    ticketUrlOverride,
    heroImage{
      ${imageQuery}
    },
    locations[]->{
      _id,
      name,
      slug,
      stageType,
      description,
      address,
      mapUrl,
      image{
        ${imageQuery}
      }
    },
    artists[]->{
      _id,
      name,
      slug,
      genre,
      description,
      externalUrl,
      photo{
        ${imageQuery}
      }
    },
    partners[]->{
      _id,
      name,
      slug,
      level,
      url,
      logo{
        ${imageQuery}
      }
    },
    body[]{
      ${bodyQuery}
    },
    ${metaQuery}
  }
`;

export const LANDING_CITIES_QUERY = groq`
  *[_type == "festivalCity" && defined(slug.current)] | order(orderRank asc){
    _id,
    "slug": slug.current,
    title,
    cityName,
    themeKey,
    heroImage{
      ${imageQuery}
    }
  }
`;
