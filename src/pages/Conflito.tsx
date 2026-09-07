import { Link } from "react-router-dom";
import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export function Conflito() {
  const { t } = useCotl();
  useDocumentMeta("O Conflito · Children of the Lance", t.conflito.lead);

  const locations = ["Solace", "Qualinesti", "Palanthas", t.conflito.ruinsOfNeraka];

  return (
    <div className="cotl-container cotl-section">
      <p className="cotl-eyebrow">O Conflito</p>
      <h1>The Conflict</h1>

      <div className="cotl-prose">
        <p className="cotl-lead">{t.conflito.lead}</p>

        <h2>The search for the Silver Child</h2>
        <p>{t.conflito.silverChild}</p>

        <h2>The Eight Knights of Takhisis</h2>
        {t.conflito.knights.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <h2>Children versus Legacy</h2>
        <p>
          {t.conflito.legacy} <em>Children versus Legacy.</em>
        </p>

        <h2>Where it plays out</h2>
        <p>{t.conflito.whereIntro}</p>
      </div>

      <div className="cotl-chips" style={{ marginTop: "1rem" }}>
        {locations.map((place) => (
          <span key={place} className="cotl-chip">
            {place}
          </span>
        ))}
      </div>

      <hr className="cotl-divider" />
      <Link className="cotl-btn cotl-btn--primary" to="/ler">
        {t.hero.ctaRead}
      </Link>
    </div>
  );
}
