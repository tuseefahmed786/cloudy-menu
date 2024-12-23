import React from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n'; // Import i18n setup

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  };

  return (
    <div className="relative inline-block">
      <select
        onChange={(e) => handleLanguageChange(e.target.value)}
        value={i18n.language}
        className="px-2 py-1 border rounded-md bg-white shadow focus:outline-none"
      >
        <option value="en">En</option>
        <option value="ar">AR</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
