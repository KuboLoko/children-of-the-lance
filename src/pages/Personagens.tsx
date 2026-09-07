import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { CharacterCard } from "../components/CharacterCard";
import {
  HEROES,
  SUPPORTING,
  VILLAINS,
  type Character,
} from "../data/characters";

export function Personagens() {
  const { t } = useCotl();
  const c = t.personagens;
  useDocumentMeta(`${c.h1} · Children of the Lance`, c.lead);

  const renderGroup = (list: Character[]) =>
    list.map((ch) => (
      <CharacterCard
        key={ch.id}
        character={ch}
        role={t.characters[ch.id].role}
        bio={t.characters[ch.id].bio}
        creditLabel={t.creditos.artworkBeside}
      />
    ));

  return (
    <div className="cotl-container cotl-section">
      <p className="cotl-eyebrow">{c.eyebrow}</p>
      <h1>{c.h1}</h1>
      <p className="cotl-lead">{c.lead}</p>

      <h2 style={{ marginTop: "3rem" }}>{c.h2Heroes}</h2>
      <div className="cotl-grid">{renderGroup(HEROES)}</div>

      <h2 style={{ marginTop: "3.5rem" }}>{c.h2Supporting}</h2>
      <div className="cotl-grid">{renderGroup(SUPPORTING)}</div>

      <h2 style={{ marginTop: "3.5rem" }}>{c.h2Villains}</h2>
      <div className="cotl-grid">{renderGroup(VILLAINS)}</div>
    </div>
  );
}
