import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tEn from "../public/locales/en/translation.json";
import tDe from "../public/locales/de/translation.json";
import tKh from "../public/locales/kh/translation.json";
let lang = 'en';
if( typeof window !== 'undefined') {
  lang = window.localStorage.getItem('lang') || 'en';
}
i18n.use(initReactI18next) 
.init({
  resources: {
    en: {
      translation: tEn,
    },
    de: {
      translation: tDe,
    },
    kh: {
      translation: tKh,
    }, 
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
