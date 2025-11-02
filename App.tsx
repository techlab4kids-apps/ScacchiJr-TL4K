import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Header } from './components/Header';
import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { LevelNavigator } from './components/LevelNavigator';
import { Modal } from './components/Modal';
import { GameModeSwitcher } from './components/GameModeSwitcher';
import { useGame } from './hooks/useGame';
import { loadDefaultLevels, calculateSolution, LevelConfig } from './services/levelService';
import { Level, GameState, GameMode } from './types';
import { QuestionIcon } from './components/Icons';
import { useI18n } from './i18n';

export default function App() {
  const [allLevels, setAllLevels] = useState<LevelConfig>({ basic: [], advanced: [] });
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.BASIC);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setIsLoading(true);
        const defaultLevels = await loadDefaultLevels();
        setAllLevels(defaultLevels);
        setError(null);
      } catch (err) {
        setError(t('app.error_load_levels'));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLevels();
  }, [t]);

  const levels = gameMode === GameMode.BASIC ? allLevels.basic : allLevels.advanced;
  const currentLevel = levels[currentLevelIndex];

  const {
    gameState,
    piecePosition,
    commandSequences,
    attempts,
    addCommand,
    clearSequences,
    executeSequence,
    resetForNewLevel,
    setGameState,
    addMove,
    removeMove,
    updateMoveSequence,
    getTotalCommands,
  } = useGame(currentLevel, gameMode);
  
  const handleGameModeChange = (newMode: GameMode) => {
    setGameMode(newMode);
    setCurrentLevelIndex(0);
    const newLevels = newMode === GameMode.BASIC ? allLevels.basic : allLevels.advanced;
    if (newLevels.length > 0) {
       resetForNewLevel(newLevels[0]);
    } else {
       resetForNewLevel(undefined);
    }
  }

  const handleLevelChange = useCallback((newIndex: number) => {
    if (newIndex >= 0 && newIndex < levels.length) {
      setCurrentLevelIndex(newIndex);
      resetForNewLevel(levels[newIndex]);
    }
  }, [levels, resetForNewLevel]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result;
          if (typeof content === 'string') {
            const newConfig = JSON.parse(content);
            // Check if it's the new format
            if (newConfig.basic && newConfig.advanced) {
              setAllLevels(newConfig);
              const newLevels = gameMode === GameMode.BASIC ? newConfig.basic : newConfig.advanced;
              setCurrentLevelIndex(0);
              resetForNewLevel(newLevels[0]);
            } else if (Array.isArray(newConfig) && newConfig.length > 0) {
              // Handle old format for backward compatibility
              setAllLevels({ basic: newConfig, advanced: [] });
              setGameMode(GameMode.BASIC);
              setCurrentLevelIndex(0);
              resetForNewLevel(newConfig[0]);
            } else {
              setError(t('app.error_invalid_json'));
            }
          }
        } catch (err) {
          setError(t('app.error_parse_json'));
          console.error(err);
        }
      };
      reader.readAsText(file);
    }
  };

  const closeModal = () => {
    if (gameState === GameState.SUCCESS) {
      handleLevelChange(currentLevelIndex + 1);
    } else {
      clearSequences();
      setGameState(GameState.IDLE);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-blue-100 text-2xl font-bold">{t('app.loading')}</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen bg-red-100 text-red-700 text-2xl font-bold">{error}</div>;
  }

  if (!currentLevel) {
    return (
       <div className="flex flex-col items-center justify-center h-screen bg-yellow-100 text-yellow-800 text-2xl font-bold p-4 text-center">
        <p>{t('app.no_levels_loaded')}</p>
        <p className="text-lg mt-2">{t('app.no_levels_prompt')}</p>
        <GameModeSwitcher mode={gameMode} onModeChange={handleGameModeChange} />
        <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="mt-4 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
       </div>
    );
  }

  const solution = calculateSolution(currentLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-indigo-300 flex flex-col items-center justify-center p-2 sm:p-4 text-gray-800 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 bg-white/50 rounded-3xl shadow-2xl backdrop-blur-sm">
        <Header 
          isSoundOn={isSoundOn} 
          onToggleSound={() => setIsSoundOn(prev => !prev)}
        />
        
        <div className="flex flex-wrap justify-between items-center my-4 gap-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsHelpModalOpen(true)} className="p-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-transform duration-200 hover:scale-110 shadow-lg">
                  <QuestionIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white"/>
              </button>
              <GameModeSwitcher mode={gameMode} onModeChange={handleGameModeChange} />
            </div>
            <LevelNavigator 
                currentLevel={currentLevelIndex + 1}
                totalLevels={levels.length}
                onBack={() => handleLevelChange(currentLevelIndex - 1)}
                onNext={() => handleLevelChange(currentLevelIndex + 1)}
            />
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8 items-start">
          <div className="lg:col-span-3 order-2 lg:order-1 flex justify-center">
            <Board 
              level={currentLevel}
              piecePosition={piecePosition}
            />
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Controls 
              sequences={commandSequences}
              maxCommands={currentLevel.maxComandi}
              onArrowClick={addCommand}
              onClear={clearSequences}
              onExecute={executeSequence}
              disabled={gameState !== GameState.IDLE}
              gameMode={gameMode}
              onAddMove={addMove}
              onRemoveMove={removeMove}
              onUpdateMoveSequence={updateMoveSequence}
              totalCommands={getTotalCommands()}
            />
          </div>
        </main>
        
        <div className="mt-4 text-center">
          <label className="text-sm font-semibold bg-violet-200 text-violet-800 px-3 py-1 rounded-full cursor-pointer hover:bg-violet-300 transition">
            {t('app.load_custom_levels')}
            <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
            />
          </label>
        </div>
      </div>
      {(gameState !== GameState.IDLE && gameState !== GameState.EXECUTING) && (
        <Modal 
          isOpen={true} 
          onClose={closeModal} 
          state={gameState} 
          solution={solution}
          isLastAttempt={attempts >= currentLevel.maxTentativi -1}
        />
      )}
      <Modal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        state={GameState.HELP}
      />
    </div>
  );
}