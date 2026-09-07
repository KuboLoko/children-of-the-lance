/**
 * Site-wide configuration and the few strings that are the same in every
 * language.
 *
 * Translatable prose lives in src/i18n/content.ts. Character bios live there
 * too; this file only holds structural data (see src/data/characters.ts).
 */

import type { CotlCopy } from "../i18n/content";

/** Official Dragonlance logo. Drop the file here with this exact name. */
export const COTL_LOGO = "/images/logo/dragonlance-logo.png";

/** Work title and three-word summary. Kept in the original English everywhere. */
export const COTL_TITLE = "Children of the Lance";
export const COTL_TAGLINE = "Children versus Legacy";

/**
 * Mandatory legal disclaimer. Kept in Portuguese in every language, on
 * purpose. Rendered in the footer on every page and again, in full, on the
 * Credits page. Do not shorten or alter the wording.
 */
export const COTL_DISCLAIMER =
  "Children of the Lance é uma obra de fã não oficial. Não é afiliada, " +
  "endossada ou associada à Wizards of the Coast. Dragonlance e todas as " +
  "propriedades relacionadas são marcas registadas da Wizards of the Coast.";

/**
 * Navbar links. `key` maps to the label in src/i18n/content.ts `nav`, so the
 * navbar follows the chosen language. `to` values are the root-level routes.
 */
export const COTL_NAV = [
  { key: "home", to: "/" },
  { key: "historia", to: "/historia" },
  { key: "personagens", to: "/personagens" },
  { key: "conflito", to: "/conflito" },
  { key: "ler", to: "/ler" },
  { key: "creditos", to: "/creditos" },
] as const satisfies { key: keyof CotlCopy["nav"]; to: string }[];

/**
 * Placeholder for the real reading link (AO3, Wattpad, etc.).
 * Set this to the URL and the button on the "Ler a História" page activates.
 */
export const COTL_READ_URL: string | null = null;
