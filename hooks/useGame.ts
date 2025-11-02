import { useState, useEffect, useCallback } from 'react';
import { Level, Position, Direction, GameState, GameMode } from '../types';
import { BOARD_SIZE } from '../constants';

const isHorizontal = (dir: Direction) => dir === Direction.LEFT || dir === Direction.RIGHT;
const isVertical = (dir: Direction) => dir === Direction.UP || dir === Direction.DOWN;

export const useGame = (level: Level | undefined, gameMode: GameMode) => {
  // Now an array of sequences, for multi-move in advanced mode
  const [commandSequences, setCommandSequences] = useState<Direction[][]>([[]]);
  const [piecePosition, setPiecePosition] = useState<Position>(level?.posizioneIniziale ?? { x: 0, y: 0 });
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [attempts, setAttempts] = useState(0);

  const resetForNewLevel = useCallback((newLevel: Level | undefined) => {
    setCommandSequences([[]]);
    setPiecePosition(newLevel?.posizioneIniziale ?? { x: 0, y: 0 });
    setGameState(GameState.IDLE);
    setAttempts(0);
  }, []);

  useEffect(() => {
    resetForNewLevel(level);
  }, [level, resetForNewLevel]);

  const getTotalCommands = () => commandSequences.reduce((sum, seq) => sum + seq.length, 0);

  const addCommand = (direction: Direction, moveIndex: number = 0) => {
    if (!level || getTotalCommands() >= level.maxComandi) return;
    setCommandSequences(prev => {
        const newSequences = [...prev];
        if(!newSequences[moveIndex]) newSequences[moveIndex] = [];
        newSequences[moveIndex] = [...newSequences[moveIndex], direction];
        return newSequences;
    });
  };

  const addMove = () => {
    if (!level || getTotalCommands() >= level.maxComandi) return;
    setCommandSequences(prev => [...prev, []]);
  }

  const removeMove = (moveIndex: number) => {
    setCommandSequences(prev => prev.filter((_, i) => i !== moveIndex));
  }
  
  const updateMoveSequence = (moveIndex: number, newSequence: Direction[]) => {
     setCommandSequences(prev => {
        const newSequences = [...prev];
        newSequences[moveIndex] = newSequence;
        return newSequences;
    });
  }

  const clearSequences = useCallback(() => {
    setCommandSequences([[]]);
    if (level) {
      setPiecePosition(level.posizioneIniziale);
    }
  }, [level]);

  const executeSequence = useCallback(() => {
    if (!level || getTotalCommands() === 0) return;

    // --- Advanced Mode Validation ---
    if (gameMode === GameMode.ADVANCED) {
      for (const move of commandSequences) {
        if (move.length > 0) {
          const firstDirType = isHorizontal(move[0]) ? 'h' : 'v';
          for (let i = 1; i < move.length; i++) {
            const currentDirType = isHorizontal(move[i]) ? 'h' : 'v';
            if (currentDirType !== firstDirType) {
              setGameState(GameState.INVALID_MOVE_ERROR);
              return; // Stop execution
            }
          }
        }
      }
    }
    
    setGameState(GameState.EXECUTING);
    let currentPos = { ...level.posizioneIniziale };
    let sequenceIsValid = true;
    const allCommands = commandSequences.flat();

    const moveStep = (stepIndex: number) => {
      if (stepIndex >= allCommands.length) {
        if (sequenceIsValid && currentPos.x === level.posizioneBersaglio.x && currentPos.y === level.posizioneBersaglio.y) {
          setGameState(GameState.SUCCESS);
        } else {
          setAttempts(prev => prev + 1);
          if (attempts + 1 >= level.maxTentativi) {
             setGameState(GameState.SHOW_SOLUTION);
          } else {
             setGameState(GameState.ERROR);
          }
          setTimeout(() => setPiecePosition(level.posizioneIniziale), 500);
        }
        return;
      }

      const direction = allCommands[stepIndex];
      switch (direction) {
        case Direction.UP:    currentPos.y--; break;
        case Direction.DOWN:  currentPos.y++; break;
        case Direction.LEFT:  currentPos.x--; break;
        case Direction.RIGHT: currentPos.x++; break;
      }
      
      if (currentPos.x < 0 || currentPos.x >= BOARD_SIZE || currentPos.y < 0 || currentPos.y >= BOARD_SIZE) {
        sequenceIsValid = false;
      }
      
      setPiecePosition({ ...currentPos });

      setTimeout(() => moveStep(stepIndex + 1), 400);
    };

    moveStep(0);
  }, [level, commandSequences, attempts, gameMode]);

  return {
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
  };
};