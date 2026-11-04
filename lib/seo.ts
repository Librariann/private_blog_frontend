import { SITE_URL } from "@/common/constants";

export function getCanonicalUrl(path: string) {
  const requestedUrl = new URL(path, SITE_URL);
  const canonicalUrl = new URL(requestedUrl.pathname, SITE_URL);
  const page = requestedUrl.searchParams.get("page");

  if (
    requestedUrl.pathname === "/all-posts-page" &&
    page &&
    /^\d+$/.test(page) &&
    Number(page) > 1
  ) {
    canonicalUrl.searchParams.set("page", String(Number(page)));
  }

  return canonicalUrl.href;
}
