import { useCotl } from "../i18n/LocaleContext";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { CharacterCard } from "../components/CharacterCard";
import { HEROES, SUPPORTING, VILLAINS, type Character } from "../data/characters";

export function Personagens() {
  const { t } = useCotl();
  useDocumentMeta("Personagens · Children of the Lance", t.personagens.lead);

  const renderGroup = (list: Character[]) =>
    list.map((c) => (
      <CharacterCard
        key={c.id}
        character={c}
        role={t.characters[c.id].role}
        bio={t.characters[c.id].bio}
        creditLabel={t.creditos.artworkBeside}
      />
    ));

  return (
    <div className="cotl-container cotl-section">
      <p className="cotl-eyebrow">Personagens</p>
      <h1>Characters</h1>
      <p className="cotl-lead">{t.personagens.lead}</p>

      <h2 style={{ marginTop: "3rem" }}>The Children of the Lance</h2>
      <div className="cotl-grid">{renderGroup(HEROES)}</div>

      <h2 style={{ marginTop: "3.5rem" }}>Supporting Characters</h2>
      <div className="cotl-grid">{renderGroup(SUPPORTING)}</div>

      <h2 style={{ marginTop: "3.5rem" }}>The Villains</h2>
      <div className="cotl-grid">{renderGroup(VILLAINS)}</div>
    </div>
  );
}
