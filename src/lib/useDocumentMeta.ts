import { useEffect } from "react";

/** Canonical origin of the deployed site. */
export const SITE_URL = "https://children-of-the-lance.vercel.app";

/** Temporary social-preview image (swap for a purpose-made 1200x630 card later). */
const OG_IMAGE = `${SITE_URL}/images/characters/lord-soth.jpeg`;

const OG_LOCALE: Record<string, string> = {
  pt: "pt_PT",
  en: "en_US",
  es: "es_ES",
};

type MetaOptions = {
  /** Full <title>. */
  title: string;
  /** Meta / OG / Twitter description. */
  description?: string;
  /** Route path, e.g. "/historia". Use "/" (or omit) for the home page. */
  path?: string;
  /** Active locale: "pt" | "en" | "es". Controls og:locale. */
  locale?: string;
  /** e.g. "noindex" for the 404 page. Omitted = indexable. */
  robots?: string;
};

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string | undefined,
) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (content === undefined) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Keeps the document head in step with the current page and language: title,
 * description, canonical URL, and Open Graph / Twitter card tags. Small and
 * dependency-free.
 */
export function useDocumentMeta({
  title,
  description,
  path,
  locale,
  robots,
}: MetaOptions) {
  useEffect(() => {
    document.title = title;

    const url = SITE_URL + (path && path !== "/" ? path : "/");

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots ?? "index, follow");
    upsertLink("canonical", url);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "Children of the Lance");
    upsertMeta("property", "og:locale", OG_LOCALE[locale ?? "pt"] ?? "pt_PT");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", OG_IMAGE);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", OG_IMAGE);
  }, [title, description, path, locale, robots]);
}
