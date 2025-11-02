
import React from 'react';
import { Level, Position, PieceType } from '../types';
import { BOARD_SIZE } from '../constants';
import { RookIcon, QueenIcon, PawnIcon } from './Icons';

interface BoardProps {
  level: Level;
  piecePosition: Position;
}

const Piece: React.FC<{ type: PieceType; className?: string }> = ({ type, className }) => {
  const pieceClasses = `w-full h-full p-1 drop-shadow-lg ${className}`;
  switch (type) {
    case PieceType.ROOK:
      return <RookIcon className={pieceClasses + ' text-blue-500'} />;
    case PieceType.QUEEN:
      return <QueenIcon className={pieceClasses + ' text-purple-500'} />;
    case PieceType.PAWN:
      return <PawnIcon className={pieceClasses + ' text-green-500'} />;
    default:
      return null;
  }
};

export const Board: React.FC<BoardProps> = ({ level, piecePosition }) => {
  const { posizioneIniziale, pezzoDaMuovere, posizioneBersaglio, pezzoBersaglio } = level;

  const cells = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const isLight = (x + y) % 2 === 0;
      cells.push(
        <div 
          key={`${x}-${y}`} 
          className={`w-full h-full ${isLight ? 'bg-emerald-100' : 'bg-emerald-300'}`}
        />
      );
    }
  }

  return (
    <div className="aspect-square w-full max-w-lg md:max-w-xl lg:max-w-2xl bg-emerald-400 p-2 sm:p-3 rounded-2xl shadow-lg relative">
      <div className="grid grid-cols-8 grid-rows-8 w-full h-full relative overflow-hidden rounded-lg">
        {cells}
        
        <div
          className="absolute w-[12.5%] h-[12.5%] transition-transform duration-300 ease-in-out"
          style={{
            transform: `translate(${piecePosition.x * 100}%, ${piecePosition.y * 100}%)`,
          }}
        >
          <Piece type={pezzoDaMuovere} />
        </div>
        
        <div
          className="absolute w-[12.5%] h-[12.5%]"
          style={{
            transform: `translate(${posizioneBersaglio.x * 100}%, ${posizioneBersaglio.y * 100}%)`,
          }}
        >
          <Piece type={pezzoBersaglio} className="opacity-70" />
           <div className="absolute inset-0 rounded-full border-4 border-dashed border-yellow-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
