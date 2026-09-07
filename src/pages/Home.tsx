import { Link } from "react-router-dom";
import { COTL_TAGLINE, COTL_TITLE } from "../data/site";
import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { Logo } from "../components/Logo";

export function Home() {
  const { t } = useCotl();
  useDocumentMeta("Children of the Lance", t.hero.hook);

  return (
    <section className="cotl-hero cotl-container">
      <Logo
        className="cotl-hero__logo"
        fallbackClassName="cotl-hero__logo-fallback"
      />

      <h1>{COTL_TITLE}</h1>
      <p className="cotl-hero__tagline">{COTL_TAGLINE}</p>
      <p className="cotl-hero__premise">{t.hero.hook}</p>

      <div className="cotl-hero__cta">
        <Link className="cotl-btn cotl-btn--primary" to="/ler">
          {t.hero.ctaRead}
        </Link>
        <Link className="cotl-btn cotl-btn--ghost" to="/historia">
          {t.hero.ctaAbout}
        </Link>
      </div>
    </section>
  );
}
