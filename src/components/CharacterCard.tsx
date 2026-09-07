import type { Character } from "../data/characters";
import { ArtCredit } from "./ArtCredit";

/**
 * One character card: portrait (or a placeholder), name, role, short bio, and
 * an artist credit shown directly under the image when the art is borrowed.
 *
 * `role` and `bio` come from the active language (src/i18n/content.ts).
 */
export function CharacterCard({
  character,
  role,
  bio,
  creditLabel,
}: {
  character: Character;
  role: string;
  bio: string[];
  creditLabel?: string;
}) {
  return (
    <article className="cotl-card">
      <figure className="cotl-portrait">
        {character.image ? (
          <img
            src={character.image}
            alt={`${character.name} — ${role}`}
            loading="lazy"
          />
        ) : (
          <div className="cotl-portrait__placeholder">
            Add portrait
            <br />
            {character.id}.jpeg
          </div>
        )}
        {/* Credit sits next to the image, not only on the Credits page. */}
        <figcaption>
          <ArtCredit artist={character.artist} label={creditLabel} />
        </figcaption>
      </figure>

      <h3>{character.name}</h3>
      <p className="cotl-card__role">{role}</p>

      {bio.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </article>
  );
}
