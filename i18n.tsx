import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

export const LANGUAGES = [
  { code: 'it', name: 'Italiano', dir: 'ltr' },
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
  { code: 'uk', name: 'Українська', dir: 'ltr' },
  { code: 'zh', name: '中文 (简体)', dir: 'ltr' },
  { code: 'fa', name: 'دری (Afghan)', dir: 'rtl' },
] as const; // FIX: Use a const assertion to infer literal types for 'dir'.
const LANG_CODES = LANGUAGES.map(l => l.code);

type Translations = Record<string, any>;

interface I18nContextType {
  lang: string;
  setLang: (lang: string) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const getInitialLang = (): string => {
    return 'it'; // Imposta sempre l'italiano come lingua predefinita
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<string>(getInitialLang);
  const [translations, setTranslations] = useState<Record<string, Translations> | null>(null);

  useEffect(() => {
    const loadAllTranslations = async () => {
        try {
            const promises = LANG_CODES.map(code =>
                fetch(`./locales/${code}.json`).then(res => {
                    if (!res.ok) {
                        throw new Error(`Failed to fetch ${code}.json`);
                    }
                    return res.json();
                })
            );
            const loadedTranslations = await Promise.all(promises);
            const translationsMap: Record<string, Translations> = {};
            LANG_CODES.forEach((code, index) => {
                translationsMap[code] = loadedTranslations[index];
            });
            setTranslations(translationsMap);
        } catch (error) {
            console.error("Failed to load translations:", error);
            setTranslations({}); // Set to empty to avoid crashing
        }
    }
    loadAllTranslations();
  }, []);

  const dir = LANGUAGES.find(l => l.code === lang)?.dir || 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const t = useCallback((key: string): string => {
    if (!translations) return key;

    const keys = key.split('.');

    const findTranslation = (language: string) => {
        let result: any = translations[language];
        if (!result) return undefined;
        for (const k of keys) {
            result = result?.[k];
        }
        return result;
    }

    let translated = findTranslation(lang);
    if (typeof translated === 'string') {
        return translated;
    }

    // Fallback to English
    translated = findTranslation('en');
    if (typeof translated === 'string') {
        return translated;
    }

    // Fallback to key
    return key;
  }, [lang, translations]);

  if (!translations) {
      // Render nothing while translations are loading
      return null;
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
