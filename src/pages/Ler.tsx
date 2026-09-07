import { COTL_READ_URL } from "../data/site";
import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export function Ler() {
  const { t } = useCotl();
  useDocumentMeta("Ler a História · Children of the Lance", t.ler.lead);

  const hasLink = Boolean(COTL_READ_URL);

  return (
    <div className="cotl-container cotl-section">
      <p className="cotl-eyebrow">Ler a História</p>
      <h1>Read the Story</h1>

      <div className="cotl-prose">
        <p className="cotl-lead">{t.ler.lead}</p>

        {hasLink ? (
          <p>
            <a
              className="cotl-btn cotl-btn--primary"
              href={COTL_READ_URL as string}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.ler.openStory}
            </a>
          </p>
        ) : (
          <p>
            <span className="cotl-btn cotl-btn--primary" aria-disabled="true">
              {t.ler.comingSoon}
            </span>
            <br />
            <small>{t.ler.activateNote}</small>
          </p>
        )}

        <p>
          <em>{t.ler.placeholder}</em>
        </p>
      </div>
    </div>
  );
}
