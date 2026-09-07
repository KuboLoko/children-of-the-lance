/**
 * Structural character data: id, display name, which section the card belongs
 * to, and the image + artist credit.
 *
 * The translatable parts (role line and bio paragraphs) live in
 * src/i18n/content.ts, keyed by the same `id`.
 *
 * IMAGES
 * ------
 * Put files in: public/images/characters/
 * Then set `image` to "/images/characters/<file>". Use null for a placeholder.
 *
 * ARTIST CREDIT
 * -------------
 * Set `artist` for official Dragonlance artwork or any art you did not make,
 * so the credit shows directly beneath the image. Leave it null otherwise.
 */

export type Character = {
  /** Stable id. Also the key into src/i18n/content.ts `characters`. */
  id: string;
  /** Display name (not translated). */
  name: string;
  /** Which section the card appears in. */
  side: "hero" | "supporting" | "villain";
  /** Path under /public, or null for a placeholder. */
  image: string | null;
  /** Artist credit for official/borrowed artwork, or null. */
  artist: string | null;
};

export const HEROES: Character[] = [
  {
    id: "palin-majere",
    name: "Palin Majere",
    side: "hero",
    image: "/images/characters/palin-majere.jpeg",
    artist: null,
  },
  {
    id: "karst-uth-matar",
    name: "Karst Uth Matar",
    side: "hero",
    image: null,
    artist: null,
  },
  {
    id: "gryff",
    name: "Gryff",
    side: "hero",
    image: null,
    artist: null,
  },
];

export const SUPPORTING: Character[] = [
  {
    id: "usha-dithon",
    name: "Usha DiThon",
    side: "supporting",
    image: "/images/characters/usha-dithon.jpeg",
    artist: null,
  },
];

export const VILLAINS: Character[] = [
  {
    id: "ariakan-ariakas",
    name: "Ariakan Ariakas",
    side: "villain",
    image: null,
    artist: null,
  },
  {
    id: "zorath",
    name: "Zorath",
    side: "villain",
    image: null,
    artist: null,
  },
  {
    id: "lord-soth",
    name: "Lord Soth",
    side: "villain",
    image: "/images/characters/lord-soth.jpeg",
    artist: "PLACEHOLDER — add the artist's name here",
  },
];

/** Every character in one list, in display order. */
export const ALL_CHARACTERS: Character[] = [...HEROES, ...SUPPORTING, ...VILLAINS];
