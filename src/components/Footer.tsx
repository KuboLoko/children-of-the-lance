import { Link } from "react-router-dom";
import { COTL_DISCLAIMER } from "../data/site";

/**
 * Footer shown on every page. The legal disclaimer here is mandatory and must
 * stay on every page. The full version is repeated on the Credits page.
 */
export function Footer() {
  return (
    <footer className="cotl-footer">
      <div className="cotl-container">
        <p className="cotl-footer__disclaimer">{COTL_DISCLAIMER}</p>
        <p className="cotl-footer__meta">
          A fan project · <Link to="/creditos">Créditos &amp; Aviso Legal</Link>
        </p>
      </div>
    </footer>
  );
}
