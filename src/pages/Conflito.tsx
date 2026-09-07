import { Link } from "react-router-dom";
import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export function Conflito() {
  const { t } = useCotl();
  const c = t.conflito;
  useDocumentMeta(`${c.h1} · Children of the Lance`, c.lead);

  const locations = ["Solace", "Qualinesti", "Palanthas", c.ruinsOfNeraka];

  return (
    <div className="cotl-container cotl-section">
      <p className="cotl-eyebrow">{c.eyebrow}</p>
      <h1>{c.h1}</h1>

      <div className="cotl-prose">
        <p className="cotl-lead">{c.lead}</p>

        <h2>{c.h2Search}</h2>
        <p>{c.silverChild}</p>

        <h2>{c.h2Knights}</h2>
        {c.knights.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <h2>{c.h2Legacy}</h2>
        <p>
          {c.legacy} <em>Children versus Legacy.</em>
        </p>

        <h2>{c.h2Where}</h2>
        <p>{c.whereIntro}</p>
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
