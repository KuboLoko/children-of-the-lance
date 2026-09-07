import { Link } from "react-router-dom";
import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export function Historia() {
  const { t } = useCotl();
  const c = t.historia;
  useDocumentMeta(`${c.h1} · Children of the Lance`, c.leadIntro);

  return (
    <div className="cotl-container cotl-section">
      <p className="cotl-eyebrow">{c.eyebrow}</p>
      <h1>{c.h1}</h1>

      <div className="cotl-prose">
        <p className="cotl-lead">
          {c.leadIntro} <em>Children versus Legacy</em>.
        </p>

        <h2>{c.h2Before}</h2>
        {c.before.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <h2>{c.h2Premise}</h2>
        {c.premise.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <h2>{c.h2World}</h2>
        {c.world.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <hr className="cotl-divider" />
      <Link className="cotl-btn cotl-btn--primary" to="/personagens">
        {c.ctaMeet}
      </Link>
    </div>
  );
}
