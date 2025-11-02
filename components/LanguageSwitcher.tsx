
import React, { useState, useRef, useEffect } from 'react';
import { useI18n, LANGUAGES } from '../i18n';
import { GlobeIcon } from './Icons';

export const LanguageSwitcher: React.FC = () => {
    const { lang, setLang, t } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguageName = t(`languages.${lang}`);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const handleLanguageChange = (code: string) => {
        setLang(code);
        setIsOpen(false);
    }

    return (
        <div ref={dropdownRef} className="relative">
            <button 
                onClick={() => setIsOpen(prev => !prev)}
                className="flex items-center space-x-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <GlobeIcon className="w-6 h-6 text-blue-500" />
                <span className="hidden sm:inline font-semibold text-gray-700">{currentLanguageName}</span>
            </button>
            {isOpen && (
                <ul className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 overflow-hidden" role="menu">
                    {LANGUAGES.map(({ code }) => (
                        <li key={code}>
                            <button
                                onClick={() => handleLanguageChange(code)}
                                className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${lang === code ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-100'}`}
                                role="menuitem"
                            >
                                {t(`languages.${code}`)}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
