"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, TranslationKey } from '@/lib/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');
    const [isInitialized, setIsInitialized] = useState(false);

    // Load saved language preference on mount, or detect from geo
    useEffect(() => {
        const initLanguage = async () => {
            const savedLang = localStorage.getItem('language') as Language;

            if (savedLang && (savedLang === 'en' || savedLang === 'sk')) {
                // User has a saved preference - use it
                setLanguage(savedLang);
            } else {
                // No saved preference - fetch geo-detection
                try {
                    const response = await fetch('/api/geo');
                    const data = await response.json();

                    if (data.country === 'SK') {
                        // Visitor from Slovakia - set Slovak
                        setLanguage('sk');
                        localStorage.setItem('language', 'sk');
                    } else {
                        // Everyone else - set English
                        setLanguage('en');
                        localStorage.setItem('language', 'en');
                    }
                } catch (error) {
                    // On error, default to English
                    setLanguage('en');
                    localStorage.setItem('language', 'en');
                }
            }

            setIsInitialized(true);
        };

        initLanguage();
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: TranslationKey): string => {
        return translations[language][key] || key;
    };

    // Don't render children until language is initialized to prevent flash
    if (!isInitialized) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
