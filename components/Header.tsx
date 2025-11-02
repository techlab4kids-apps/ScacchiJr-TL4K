import React from 'react';
import { SoundOnIcon, SoundOffIcon } from './Icons';
import { useI18n } from '../i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
    isSoundOn: boolean;
    onToggleSound: () => void;
}

// Per usare il tuo logo: converti il tuo file PNG in Base64 e incolla la stringa qui.
const LOGO_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAxNTAgNDAiPjxzdHlsZT4udGV4dHtmb250LWZhbWlseTonTnVuaXRvJyxzYW5zLXNlcmlmO2ZvbnQtc2l6ZToyMHB4O2ZvbnQtd2VpZ2h0OjkwMDt9LmxhYntmaWxsOiM4QjVDRjY7fS5raWRze2ZpbGw6IzNCODJGNjt9PC9zdHlsZT48dGV4dCB4PSIwIiB5PSIyOCIgY2xhc3M9InRleHQiPlRlY2g8dHNwYW4gY2xhc3M9ImxhYiI+TEFCPC90c3Bhbj48dHNwYW4gY2xhc3M9ImtpZHMiPjRLaWRzPC90c3Bhbj48L3RleHQ+PC9zdmc+';

export const Header: React.FC<HeaderProps> = ({ isSoundOn, onToggleSound }) => {
    const { t } = useI18n();
    return (
        <header className="text-center relative py-4">
            <div className="inline-flex items-center gap-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                    ScacchiJr
                </h1>
                <img src={LOGO_PLACEHOLDER} alt="TechLab4Kids Logo" className="h-10 sm:h-12 md:h-14" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-gray-600 mt-1">
                "{t('header.slogan')}"
            </p>
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center space-x-2">
                <LanguageSwitcher />
                <button onClick={onToggleSound} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
                    {isSoundOn ? <SoundOnIcon className="w-6 h-6 text-green-500"/> : <SoundOffIcon className="w-6 h-6 text-red-500"/>}
                </button>
            </div>
        </header>
    );
};