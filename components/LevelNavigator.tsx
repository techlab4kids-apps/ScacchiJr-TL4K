
import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';
import { useI18n } from '../i18n';

interface LevelNavigatorProps {
  currentLevel: number;
  totalLevels: number;
  onBack: () => void;
  onNext: () => void;
}

export const LevelNavigator: React.FC<LevelNavigatorProps> = ({ currentLevel, totalLevels, onBack, onNext }) => {
  const { t } = useI18n();
  return (
    <div className="flex items-center space-x-2 sm:space-x-4 bg-white/70 px-3 py-2 rounded-full shadow-md">
      <button onClick={onBack} disabled={currentLevel <= 1} className="p-2 rounded-full enabled:hover:bg-gray-200 disabled:opacity-40 transition">
        <ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
      </button>
      <div className="text-center">
        <div className="text-sm font-bold text-gray-500">{t('level_navigator.level')}</div>
        <div className="text-2xl sm:text-3xl font-black text-gray-800">{currentLevel}</div>
      </div>
      <button onClick={onNext} disabled={currentLevel >= totalLevels} className="p-2 rounded-full enabled:hover:bg-gray-200 disabled:opacity-40 transition">
        <ArrowRightIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
      </button>
    </div>
  );
};
