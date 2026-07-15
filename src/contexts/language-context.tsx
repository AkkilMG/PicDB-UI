"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type Lang = "en" | "es" | "ru" | "hi";

interface LanguageContextValue {
  lang: Lang;
  setLanguage: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored && ["en", "es", "ru", "hi"].includes(stored)) {
      setLang(stored);
    }
  }, []);

  const setLanguage = useCallback((newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    window.dispatchEvent(new Event("language-changed"));
  }, []);

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem("lang") as Lang | null;
      if (stored && ["en", "es", "ru", "hi"].includes(stored)) {
        setLang(stored);
      }
    };
    window.addEventListener("language-changed", handler);
    return () => window.removeEventListener("language-changed", handler);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useLanguageText<T>(textMap: Record<Lang, T>): T {
  const { lang } = useLanguage();
  return textMap[lang] ?? textMap.en;
}
