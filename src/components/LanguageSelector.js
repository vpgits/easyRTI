// src/components/LanguageSelector.js
import React from 'react';

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
const languages = [
  { code: 'en', name: 'English' },
  { code: 'si', name: 'සිංහල' },
  { code: 'ta', name: 'தமிழ்' }
];

return (
  <div className="mb-4">
    <label className="block text-dark-text text-sm font-bold mb-2">
      Select Language
    </label>
    <div className="flex space-x-4">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`px-4 py-2 rounded transition-colors duration-200 ${
            selectedLanguage === lang.code
              ? 'bg-dark-accent text-dark-text'
              : 'bg-dark-secondary text-dark-text hover:bg-dark-accent'
          }`}
          onClick={() => onLanguageChange(lang.code)}
        >
          {lang.name}
        </button>
      ))}
    </div>
  </div>
);
};

export default LanguageSelector;
