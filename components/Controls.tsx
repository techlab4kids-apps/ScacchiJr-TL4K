import React, { useState, useRef } from 'react';
import { Direction, GameMode } from '../types';
import { ArrowUpIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, FlagIcon, ClearIcon, TrashIcon, PlusIcon } from './Icons';
import { useI18n } from '../i18n';

interface ControlsProps {
  sequences: Direction[][];
  maxCommands: number;
  onArrowClick: (direction: Direction, moveIndex?: number) => void;
  onClear: () => void;
  onExecute: () => void;
  disabled: boolean;
  gameMode: GameMode;
  onAddMove: () => void;
  onRemoveMove: (moveIndex: number) => void;
  onUpdateMoveSequence: (moveIndex: number, newSequence: Direction[]) => void;
  totalCommands: number;
}

const DirectionIcon: React.FC<{direction: Direction, className?: string}> = ({ direction, className }) => {
    const commonClass = `w-6 h-6 ${className}`;
    switch (direction) {
        case Direction.UP: return <ArrowUpIcon className={commonClass} />;
        case Direction.DOWN: return <ArrowDownIcon className={commonClass} />;
        case Direction.LEFT: return <ArrowLeftIcon className={commonClass} />;
        case Direction.RIGHT: return <ArrowRightIcon className={commonClass} />;
    }
};

export const Controls: React.FC<ControlsProps> = (props) => {
  const { 
    sequences, maxCommands, onArrowClick, onClear, onExecute, disabled, gameMode,
    onAddMove, onRemoveMove, onUpdateMoveSequence, totalCommands 
  } = props;
  const { t } = useI18n();
  const [isDraggingOverTrash, setIsDraggingOverTrash] = useState(false);
  
  // D&D state
  const dragItem = useRef<{moveIndex: number, cmdIndex: number} | null>(null);
  const dragOverItem = useRef<{moveIndex: number, cmdIndex: number} | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, moveIndex: number, cmdIndex: number) => {
    dragItem.current = { moveIndex, cmdIndex };
    // Make the dragged item semi-transparent
    setTimeout(() => {
        (e.target as HTMLDivElement).style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, moveIndex: number, cmdIndex: number) => {
    dragOverItem.current = { moveIndex, cmdIndex };
  };
  
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    (e.target as HTMLDivElement).style.opacity = '1';
    
    if (isDraggingOverTrash) {
      if(dragItem.current) {
        const { moveIndex, cmdIndex } = dragItem.current;
        const sequence = [...sequences[moveIndex]];
        sequence.splice(cmdIndex, 1);
        onUpdateMoveSequence(moveIndex, sequence);
      }
    } else if (dragItem.current && dragOverItem.current && dragItem.current.moveIndex === dragOverItem.current.moveIndex) {
      // Reorder logic
      const { moveIndex, cmdIndex: fromIndex } = dragItem.current;
      const { cmdIndex: toIndex } = dragOverItem.current;
      
      const sequence = [...sequences[moveIndex]];
      const [draggedItem] = sequence.splice(fromIndex, 1);
      sequence.splice(toIndex, 0, draggedItem);
      onUpdateMoveSequence(moveIndex, sequence);
    }
    
    dragItem.current = null;
    dragOverItem.current = null;
    setIsDraggingOverTrash(false);
  };

  const ArrowButton: React.FC<{direction: Direction, className?: string}> = ({ direction, className }) => (
    <button
      onClick={() => onArrowClick(direction, gameMode === GameMode.ADVANCED ? sequences.length - 1 : 0)}
      disabled={disabled || totalCommands >= maxCommands}
      className={`p-4 rounded-2xl shadow-lg transition-transform duration-200 enabled:hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <DirectionIcon direction={direction} className="w-8 h-8 text-white"/>
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-between p-4 bg-white/60 rounded-2xl shadow-lg space-y-4 min-h-[420px]">
      <div className="w-full flex-grow flex items-start gap-3">
        <div className="flex-grow space-y-2">
          {sequences.map((sequence, moveIndex) => (
            <div key={moveIndex} className="bg-gray-200/70 rounded-lg p-2">
              {gameMode === GameMode.ADVANCED && (
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-xs text-gray-600 px-2">{t('controls.move_label')} {moveIndex + 1}</p>
                  {sequences.length > 1 &&
                    <button onClick={() => onRemoveMove(moveIndex)} className="p-1 rounded-full hover:bg-red-200">
                      <TrashIcon className="w-4 h-4 text-red-500" />
                    </button>
                  }
                </div>
              )}
              <div 
                onDragOver={(e) => e.preventDefault()} // Necessary to allow drop
                className="w-full min-h-[56px] bg-gray-100 rounded-md flex items-center p-2 space-x-2 overflow-x-auto"
              >
                {sequence.map((dir, cmdIndex) => (
                  <div 
                    key={cmdIndex}
                    draggable
                    onDragStart={(e) => handleDragStart(e, moveIndex, cmdIndex)}
                    onDragEnter={(e) => handleDragEnter(e, moveIndex, cmdIndex)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    className="flex-shrink-0 p-2 bg-white rounded-md shadow cursor-grab active:cursor-grabbing"
                  >
                    <DirectionIcon direction={dir} className="text-gray-700" />
                  </div>
                ))}
                {sequence.length === 0 && <span className="text-gray-500 text-sm pl-2">{t('controls.sequence_placeholder')}</span>}
              </div>
            </div>
          ))}
           {gameMode === GameMode.ADVANCED && (
              <button
                  onClick={onAddMove}
                  disabled={disabled || totalCommands >= maxCommands}
                  className="w-full flex items-center justify-center p-2 border-2 border-dashed border-gray-400 text-gray-500 rounded-lg hover:bg-gray-200 hover:border-gray-500 transition disabled:opacity-50"
              >
                  <PlusIcon className="w-6 h-6 mr-2"/>
                  {t('controls.add_move')}
              </button>
           )}
        </div>
        
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDraggingOverTrash(true); }}
          onDragLeave={() => setIsDraggingOverTrash(false)}
          onDrop={() => setIsDraggingOverTrash(false)} // handled in handleDragEnd
          className={`flex-shrink-0 p-4 border-2 border-dashed rounded-lg transition-colors h-full flex items-center justify-center ${isDraggingOverTrash ? 'bg-red-200 border-red-500' : 'bg-gray-100/50 border-gray-300'}`}
        >
            <TrashIcon className={`w-10 h-10 transition-colors ${isDraggingOverTrash ? 'text-red-500' : 'text-gray-400'}`} />
        </div>
      </div>
      
      <p className="font-bold text-gray-700">{t('controls.commands_label')}: {totalCommands} / {maxCommands}</p>
      
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs mx-auto">
        <div />
        <ArrowButton direction={Direction.UP} className="bg-blue-500 enabled:hover:bg-blue-600"/>
        <div />
        <ArrowButton direction={Direction.LEFT} className="bg-yellow-500 enabled:hover:bg-yellow-600"/>
        <ArrowButton direction={Direction.DOWN} className="bg-red-500 enabled:hover:bg-red-600"/>
        <ArrowButton direction={Direction.RIGHT} className="bg-green-500 enabled:hover:bg-green-600"/>
      </div>

      <div className="w-full flex justify-around items-center px-4">
        <button onClick={onClear} disabled={disabled || totalCommands === 0} className="p-4 bg-gray-400 text-white rounded-full shadow-lg enabled:hover:bg-gray-500 transition-transform duration-200 enabled:hover:scale-110 disabled:opacity-50">
            <ClearIcon className="w-8 h-8"/>
        </button>
        <button onClick={onExecute} disabled={disabled || totalCommands === 0} className="p-4 bg-green-600 text-white rounded-full shadow-lg enabled:hover:bg-green-700 transition-transform duration-200 enabled:hover:scale-110 disabled:opacity-50 animate-pulse disabled:animate-none">
            <FlagIcon className="w-8 h-8"/>
        </button>
      </div>
    </div>
  );
};