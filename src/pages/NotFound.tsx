import { Link } from "react-router-dom";
import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export function NotFound() {
  const { t, locale } = useCotl();
  const c = t.notFound;
  useDocumentMeta({
    title: `404 · Children of the Lance`,
    description: c.lead,
    path: "/",
    locale,
    robots: "noindex",
  });

  return (
    <div
      className="cotl-container cotl-section"
      style={{ textAlign: "center" }}
    >
      <p className="cotl-eyebrow">404</p>
      <h1>{c.h1}</h1>
      <p className="cotl-lead" style={{ margin: "0 auto 2rem" }}>
        {c.lead}
      </p>
      <Link className="cotl-btn cotl-btn--primary" to="/">
        {c.cta}
      </Link>
    </div>
  );
}
