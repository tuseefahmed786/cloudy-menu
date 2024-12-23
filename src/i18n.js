import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './lang/en.json';
import ar from './lang/ar.json';

i18n
  .use(LanguageDetector) // Detect language based on browser or user preference
  .use(initReactI18next) // Bind i18next to React
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
