import { Link } from "react-router-dom";
import { useCotl } from "../i18n/LocaleContext";

/**
 * Footer shown on every page: the legal / trademark disclaimer and a short
 * meta line, both in the chosen language.
 */
export function Footer() {
  const { t } = useCotl();

  return (
    <footer className="cotl-footer">
      <div className="cotl-container">
        <p className="cotl-footer__disclaimer">{t.disclaimer}</p>
        <p className="cotl-footer__meta">
          {t.footer.tag} · <Link to="/creditos">{t.creditos.h1}</Link>
        </p>
      </div>
    </footer>
  );
}
