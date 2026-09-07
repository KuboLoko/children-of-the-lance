import { useEffect } from "react";

/**
 * Sets the page <title> and <meta name="description"> while a page is mounted.
 * Small and dependency-free; enough for a static fan site.
 */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;

    if (description === undefined) return;
    let tag = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "description";
      document.head.appendChild(tag);
    }
    tag.content = description;
  }, [title, description]);
}
