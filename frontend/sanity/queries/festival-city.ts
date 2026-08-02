import { groq } from "next-sanity";
import { bodyQuery } from "./shared/body";
import { imageQuery } from "./shared/image";
import { metaQuery } from "./shared/meta";

export const FESTIVAL_CITY_QUERY = groq`
  *[_type == "festivalCity" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    cityName,
    tagline,
    dateRange,
    description,
    ticketUrlOverride,
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
    "partners": select(
      defined(partners) && count(partners) > 0 => partners[]->{
        _id,
        name,
        slug,
        url,
        logo{
          ${imageQuery}
        }
      },
      *[_type == "partner"] | order(orderRank asc, name asc){
        _id,
        name,
        slug,
        url,
        logo{
          ${imageQuery}
        }
      }
    ),
    history[]{
      _key,
      year,
      title,
      description,
      sourceUrl,
      sourceLabel
    },
    body[]{
      ${bodyQuery}
    },
    ${metaQuery}
  }
`;
