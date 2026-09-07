import { COTL_LOCALES, type CotlLocale } from "../i18n/content";
import { useCotl } from "../i18n/LocaleContext";

const LABELS: Record<CotlLocale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

/**
 * PT / EN / ES toggle. Changes the reading language for the whole site and
 * remembers the choice. The navbar labels and section headings stay in
 * Portuguese; this switches the body copy and character bios.
 */
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useCotl();

  return (
    <div className="cotl-lang" role="group" aria-label={t.switchLabel}>
      {COTL_LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          className={code === locale ? "is-active" : undefined}
          aria-pressed={code === locale}
          onClick={() => setLocale(code)}
        >
          {LABELS[code]}
        </button>
      ))}
    </div>
  );
}
