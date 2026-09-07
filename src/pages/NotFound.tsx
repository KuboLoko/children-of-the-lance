import { Link } from "react-router-dom";
import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export function NotFound() {
  const { t } = useCotl();
  const c = t.notFound;
  useDocumentMeta(`404 · Children of the Lance`);

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
