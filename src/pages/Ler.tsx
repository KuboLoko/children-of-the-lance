import { COTL_READ_URL } from "../data/site";
import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export function Ler() {
  const { t } = useCotl();
  const c = t.ler;
  useDocumentMeta(`${c.h1} · Children of the Lance`, c.lead);

  const hasLink = Boolean(COTL_READ_URL);

  return (
    <div className="cotl-container cotl-section">
      <p className="cotl-eyebrow">{c.eyebrow}</p>
      <h1>{c.h1}</h1>

      <div className="cotl-prose">
        <p className="cotl-lead">{c.lead}</p>

        {hasLink ? (
          <p>
            <a
              className="cotl-btn cotl-btn--primary"
              href={COTL_READ_URL as string}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.openStory}
            </a>
          </p>
        ) : (
          <p>
            <span className="cotl-btn cotl-btn--primary" aria-disabled="true">
              {c.comingSoon}
            </span>
            <br />
            <small>{c.activateNote}</small>
          </p>
        )}

        <p>
          <em>{c.placeholder}</em>
        </p>
      </div>
    </div>
  );
}
