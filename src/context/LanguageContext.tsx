"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, TranslationKey } from '@/lib/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to set cookie
function setCookie(name: string, value: string, days: number) {
    if (typeof document === 'undefined') return;
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');
    const [isInitialized, setIsInitialized] = useState(false);

    // Load saved language preference on mount, or detect from geo URL param
    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;

        if (savedLang && (savedLang === 'en' || savedLang === 'sk')) {
            // User has a saved preference - use it
            setLanguage(savedLang);
        } else {
            // No saved preference - check geo from URL param
            const urlParams = new URLSearchParams(window.location.search);
            const geoCountry = urlParams.get('geo');

            if (geoCountry === 'SK') {
                // Visitor from Slovakia - set Slovak
                setLanguage('sk');
                localStorage.setItem('language', 'sk');
            } else {
                // Everyone else - set English
                setLanguage('en');
                localStorage.setItem('language', 'en');
            }

            // Set cookie to indicate preference has been set (prevents future redirects)
            setCookie('has-language-pref', 'true', 365);

            // Clean up URL by removing geo param
            if (geoCountry) {
                urlParams.delete('geo');
                const newUrl = urlParams.toString()
                    ? `${window.location.pathname}?${urlParams.toString()}`
                    : window.location.pathname;
                window.history.replaceState({}, '', newUrl);
            }
        }

        setIsInitialized(true);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
        setCookie('has-language-pref', 'true', 365);
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
