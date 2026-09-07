import { Link } from "react-router-dom";
import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export function Historia() {
  const { t } = useCotl();
  useDocumentMeta("A História · Children of the Lance", t.historia.leadIntro);

  return (
    <div className="cotl-container cotl-section">
      <p className="cotl-eyebrow">A História</p>
      <h1>About the Story</h1>

      <div className="cotl-prose">
        <p className="cotl-lead">
          {t.historia.leadIntro} <em>Children versus Legacy</em>.
        </p>

        <h2>What happened before</h2>
        {t.historia.before.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <h2>The premise</h2>
        {t.historia.premise.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <h2>The world: Krynn and Ansalon</h2>
        {t.historia.world.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <hr className="cotl-divider" />
      <Link className="cotl-btn cotl-btn--primary" to="/personagens">
        {t.historia.ctaMeet}
      </Link>
    </div>
  );
}
