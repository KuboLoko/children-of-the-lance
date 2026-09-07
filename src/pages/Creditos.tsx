import { COTL_DISCLAIMER } from "../data/site";
import { ALL_CHARACTERS } from "../data/characters";
import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export function Creditos() {
  const { t } = useCotl();
  useDocumentMeta("Créditos e Aviso Legal · Children of the Lance", t.creditos.unofficial);

  // Only characters whose art is borrowed need a credit line here.
  const credited = ALL_CHARACTERS.filter((c) => c.image && c.artist);

  return (
    <div className="cotl-container cotl-section">
      <p className="cotl-eyebrow">Créditos e Aviso Legal</p>
      <h1>Credits &amp; Disclaimer</h1>

      <div className="cotl-prose">
        <h2>Unofficial fan work</h2>
        <p>{t.creditos.unofficial}</p>

        <h2>Legal disclaimer</h2>
        <p>{COTL_DISCLAIMER}</p>

        <h2>Artwork credits</h2>
        <p>{t.creditos.artworkNote}</p>
        {credited.length > 0 ? (
          <ul className="cotl-list">
            {credited.map((c) => (
              <li key={c.id}>
                <strong>{c.name}</strong> — {t.creditos.artworkLabel} {c.artist}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <em>{t.creditos.noArt}</em>
          </p>
        )}

        <h2>Placeholders to fill in</h2>
        <ul className="cotl-list">
          {t.creditos.placeholders.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h2>Trademarks</h2>
        <p>{t.creditos.trademarks}</p>
      </div>
    </div>
  );
}
