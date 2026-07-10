"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import translations from "./translations";

type Locale = "es" | "en";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string | string[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");

  const t = useCallback(
    (key: string): string | string[] => {
      const value = (translations[locale] ?? translations.es)[key] as string | string[] | undefined;
      return value ?? key;
    },
    [locale],
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslate() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslate must be used within LanguageProvider");
  return ctx;
}
