import React from 'react';
import { GameState, Direction } from '../types';
import { CheckCircleIcon, ErrorCircleIcon, LightbulbIcon, ArrowUpIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, InvalidMoveIcon } from './Icons';
import { useI18n } from '../i18n';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: GameState;
  solution?: Direction[];
  isLastAttempt?: boolean;
}

const DirectionIcon: React.FC<{direction: Direction, className?: string}> = ({ direction, className }) => {
    switch (direction) {
        case Direction.UP: return <ArrowUpIcon className={className} />;
        case Direction.DOWN: return <ArrowDownIcon className={className} />;
        case Direction.LEFT: return <ArrowLeftIcon className={className} />;
        case Direction.RIGHT: return <ArrowRightIcon className={className} />;
    }
};

const SuccessContent: React.FC<{onClose: () => void}> = ({onClose}) => {
  const { t } = useI18n();
  return (
    <div className="text-center">
      <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto animate-bounce" />
      <h2 className="text-4xl font-black text-green-600 mt-4">{t('modal.success_title')}</h2>
      <p className="text-gray-600 mt-2">{t('modal.success_subtitle')}</p>
      <button onClick={onClose} className="mt-6 bg-green-500 text-white font-bold py-3 px-8 rounded-full text-xl hover:bg-green-600 transition-transform duration-200 hover:scale-105">
        {t('modal.success_button')}
      </button>
    </div>
  );
};

const ErrorContent: React.FC<{onClose: () => void, showSolution: boolean}> = ({onClose, showSolution}) => {
  const { t } = useI18n();
  return (
    <div className="text-center">
      <ErrorCircleIcon className="w-24 h-24 text-red-500 mx-auto" />
      <h2 className="text-4xl font-black text-red-600 mt-4">{t('modal.error_title')}</h2>
      <p className="text-gray-600 mt-2">{t('modal.error_subtitle')}</p>
      {showSolution && <p className="font-bold mt-2 text-blue-600">{t('modal.error_solution_prompt')}</p>}
      <button onClick={onClose} className="mt-6 bg-red-500 text-white font-bold py-3 px-8 rounded-full text-xl hover:bg-red-600 transition-transform duration-200 hover:scale-105">
        {t('modal.error_button')}
      </button>
    </div>
  );
};

const InvalidMoveErrorContent: React.FC<{onClose: () => void}> = ({onClose}) => {
  const { t } = useI18n();
  return (
    <div className="text-center">
      <InvalidMoveIcon className="w-24 h-24 text-orange-500 mx-auto" />
      <h2 className="text-4xl font-black text-orange-600 mt-4">{t('modal.invalid_move_title')}</h2>
      <p className="text-gray-600 mt-2">{t('modal.invalid_move_subtitle')}</p>
      <button onClick={onClose} className="mt-6 bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-xl hover:bg-orange-600 transition-transform duration-200 hover:scale-105">
        {t('modal.error_button')}
      </button>
    </div>
  );
};


const SolutionContent: React.FC<{onClose: () => void, solution: Direction[]}> = ({onClose, solution}) => {
    const { t } = useI18n();
    return (
        <div className="text-center">
            <LightbulbIcon className="w-24 h-24 text-yellow-500 mx-auto" />
            <h2 className="text-4xl font-black text-yellow-600 mt-4">{t('modal.solution_title')}</h2>
            <p className="text-gray-600 mt-2">{t('modal.solution_subtitle')}</p>
            <div className="flex justify-center items-center space-x-2 mt-4">
                {solution.map((dir, i) => (
                    <div key={i} className="p-2 bg-gray-200 rounded-md shadow">
                        <DirectionIcon direction={dir} className="w-8 h-8 text-gray-800" />
                    </div>
                ))}
            </div>
            <button onClick={onClose} className="mt-6 bg-yellow-500 text-white font-bold py-3 px-8 rounded-full text-xl hover:bg-yellow-600 transition-transform duration-200 hover:scale-105">
                {t('modal.solution_button')}
            </button>
        </div>
    );
};

const HelpContent: React.FC<{onClose: () => void}> = ({onClose}) => {
    const { t } = useI18n();
    return (
        <div className="text-center">
            <h2 className="text-3xl font-black text-blue-600 mt-4">{t('modal.help_title')}</h2>
            <ol className="text-left mt-4 space-y-2 text-gray-700">
                <li dangerouslySetInnerHTML={{ __html: t('modal.help_step1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('modal.help_step2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('modal.help_step3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('modal.help_step4') }} />
            </ol>
            <button onClick={onClose} className="mt-6 bg-blue-500 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-600 transition-transform duration-200 hover:scale-105">
                {t('modal.help_button')}
            </button>
        </div>
    );
};


export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, state, solution = [], isLastAttempt = false }) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (state) {
      case GameState.SUCCESS:
        return <SuccessContent onClose={onClose} />;
      case GameState.ERROR:
        return <ErrorContent onClose={onClose} showSolution={isLastAttempt} />;
      case GameState.INVALID_MOVE_ERROR:
        return <InvalidMoveErrorContent onClose={onClose} />;
      case GameState.SHOW_SOLUTION:
        return <SolutionContent onClose={onClose} solution={solution}/>;
      case GameState.HELP:
        return <HelpContent onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl transform transition-all scale-95 animate-in-popup" onClick={e => e.stopPropagation()}>
        {renderContent()}
      </div>
      <style>{`
        @keyframes in-popup {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-in-popup { animation: in-popup 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};