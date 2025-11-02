import React from 'react';
import { GameMode } from '../types';
import { useI18n } from '../i18n';

interface GameModeSwitcherProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

export const GameModeSwitcher: React.FC<GameModeSwitcherProps> = ({ mode, onModeChange }) => {
  const { t } = useI18n();

  const baseButtonClass = "px-4 py-2 text-sm sm:text-base font-bold transition-colors duration-300 focus:outline-none";
  const activeClass = "bg-violet-600 text-white shadow-md";
  const inactiveClass = "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <div className="flex bg-gray-200 rounded-full p-1">
      <button
        onClick={() => onModeChange(GameMode.BASIC)}
        className={`${baseButtonClass} rounded-l-full ${mode === GameMode.BASIC ? activeClass : inactiveClass}`}
      >
        {t('game_mode.basic')}
      </button>
      <button
        onClick={() => onModeChange(GameMode.ADVANCED)}
        className={`${baseButtonClass} rounded-r-full ${mode === GameMode.ADVANCED ? activeClass : inactiveClass}`}
      >
        {t('game_mode.advanced')}
      </button>
    </div>
  );
};