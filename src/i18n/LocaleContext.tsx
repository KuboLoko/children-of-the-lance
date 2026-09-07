import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  COTL_CONTENT,
  COTL_DEFAULT_LOCALE,
  COTL_LOCALE_STORAGE_KEY,
  type CotlCopy,
  type CotlLocale,
} from "./content";

type LocaleContextValue = {
  locale: CotlLocale;
  setLocale: (next: CotlLocale) => void;
  /** The content slice for the active locale. */
  t: CotlCopy;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: unknown): value is CotlLocale {
  return value === "pt" || value === "en" || value === "es";
}

/**
 * Provides the reading language (PT-PT default) to the whole app. The choice
 * is remembered in localStorage. Server-safe: it starts on the default and
 * hydrates from storage after mount.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<CotlLocale>(COTL_DEFAULT_LOCALE);

  // Hydrate from localStorage once, on the client.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(COTL_LOCALE_STORAGE_KEY);
      if (isLocale(saved)) setLocaleState(saved);
    } catch {
      /* private mode / storage disabled — keep the default */
    }
  }, []);

  // Keep <html lang> in step with the reading language.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: CotlLocale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(COTL_LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: COTL_CONTENT[locale] }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

/** Read the active locale, the setter, and the current content slice. */
export function useCotl(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useCotl must be used inside <LocaleProvider>");
  return ctx;
}
