const DEFAULT_SITE_URL = "https://edsonalbertassi.com";

function normalizeSiteUrl(value: string | undefined): string {
  const candidate = value?.trim();
  if (!candidate) return DEFAULT_SITE_URL;

  const withProtocol = /^https?:\/\//i.test(candidate)
    ? candidate
    : `https://${candidate}`;

  try {
    const parsed = new URL(withProtocol);
    // The public campaign origin is fixed to the .com domain. A stale
    // provider variable must not reintroduce the retired .com.br canonical.
    if (parsed.hostname.toLowerCase() !== "edsonalbertassi.com") {
      return DEFAULT_SITE_URL;
    }
    return parsed.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/** Canonical public origin used by metadata, sitemap and structured data. */
export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export function absoluteUrl(pathname: string): string {
  if (/^https?:\/\//i.test(pathname)) return pathname;
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, `${siteUrl}/`).toString();
}
