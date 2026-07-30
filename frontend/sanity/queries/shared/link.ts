export const linkQuery = `
    _key,
    ...,
    "href": select(
      isExternal => href,
      defined(href) && !defined(internalLink) => href,
      @.internalLink->_type == "festivalCity" => "/",
      @.internalLink->slug.current == "index" => "/",
      @.internalLink->_type == "post" => "/blog/" + @.internalLink->slug.current + "/",
      "/" + @.internalLink->slug.current + "/"
    )
`;
