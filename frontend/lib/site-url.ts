const DEFAULT_SITE_URL = "http://localhost:3000";

export function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (process.env.NEXT_PUBLIC_SITE_ENV === "production" && !siteUrl) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be set for production static exports."
    );
  }

  const resolvedUrl = (siteUrl || DEFAULT_SITE_URL).replace(/\/$/, "");

  try {
    return new URL(resolvedUrl).toString().replace(/\/$/, "");
  } catch {
    throw new Error(`Invalid NEXT_PUBLIC_SITE_URL: ${resolvedUrl}`);
  }
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getSiteUrl()}${normalizedPath}`;
}
