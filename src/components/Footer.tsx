import { Link } from "react-router-dom";
import { COTL_DISCLAIMER } from "../data/site";
import { useCotl } from "../i18n/LocaleContext";

/**
 * Footer shown on every page. The legal disclaimer stays in Portuguese in
 * every language (mandatory wording); the meta line below it is localised.
 */
export function Footer() {
  const { t } = useCotl();

  return (
    <footer className="cotl-footer">
      <div className="cotl-container">
        <p className="cotl-footer__disclaimer">{COTL_DISCLAIMER}</p>
        <p className="cotl-footer__meta">
          {t.footer.tag} · <Link to="/creditos">{t.creditos.h1}</Link>
        </p>
      </div>
    </footer>
  );
}
