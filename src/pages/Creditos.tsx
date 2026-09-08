import { ALL_CHARACTERS } from "../data/characters";
import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export function Creditos() {
  const { t, locale } = useCotl();
  const c = t.creditos;
  useDocumentMeta({
    title: `${c.h1} · Children of the Lance`,
    description: c.unofficial,
    path: "/creditos",
    locale,
  });

  // Only characters whose art is borrowed need a credit line here.
  const credited = ALL_CHARACTERS.filter((ch) => ch.image && ch.artist);

  return (
    <div className="cotl-container cotl-section">
      <p className="cotl-eyebrow">{c.eyebrow}</p>
      <h1>{c.h1}</h1>

      <div className="cotl-prose">
        <h2>{c.h2Unofficial}</h2>
        <p>{c.unofficial}</p>

        <h2>{c.h2Disclaimer}</h2>
        <p>{t.disclaimer}</p>

        <h2>{c.h2Credits}</h2>
        <p>{c.artworkNote}</p>
        {credited.length > 0 ? (
          <ul className="cotl-list">
            {credited.map((ch) => (
              <li key={ch.id}>
                <strong>{ch.name}</strong> — {c.artworkLabel} {ch.artist}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <em>{c.noArt}</em>
          </p>
        )}

        <h2>{c.h2InProgress}</h2>
        <p>{c.inProgress}</p>

        <h2>{c.h2Trademarks}</h2>
        <p>{c.trademarks}</p>
      </div>
    </div>
  );
}
