import React, { createContext, useContext, useState, useEffect } from 'react';
import { uiTranslations } from '../translations';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('b2bfiy_lang');
      if (saved === 'en' || saved === 'bn') {
        return saved;
      }
    }
    return 'bn'; // Default to Bangla for local accessibility
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('b2bfiy_lang', lang);
    }
  };

  const t = (key: string): string => {
    const translation = uiTranslations[key];
    if (!translation) {
      return key;
    }
    return translation[language] || translation['bn'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
