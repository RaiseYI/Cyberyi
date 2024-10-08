"use client"

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'zh';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'dashboard.title': 'Property Management Dashboard',
    'properties.title': 'Properties',
    'rent.title': 'Rent Payments',
    'maintenance.title': 'Maintenance',
    'reports.title': 'Reports',
    // Add more translations as needed
  },
  zh: {
    'dashboard.title': '物业管理仪表板',
    'properties.title': '物业',
    'rent.title': '租金支付',
    'maintenance.title': '维护',
    'reports.title': '报告',
    // Add more translations as needed
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};