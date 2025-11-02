export interface Position {
  x: number;
  y: number;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum PieceType {
  ROOK = 'torre',
  QUEEN = 'regina',
  PAWN = 'pedone',
}

export interface Level {
  livello: number;
  pezzoDaMuovere: PieceType;
  posizioneIniziale: Position;
  pezzoBersaglio: PieceType;
  posizioneBersaglio: Position;
  maxComandi: number; // In Advanced mode, this can be per move or total, we'll treat it as total for now.
  maxTentativi: number;
}

export enum GameMode {
  BASIC = 'BASIC',
  ADVANCED = 'ADVANCED',
}

export enum GameState {
  IDLE = 'IDLE',
  EXECUTING = 'EXECUTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  SHOW_SOLUTION = 'SHOW_SOLUTION',
  HELP = 'HELP',
  INVALID_MOVE_ERROR = 'INVALID_MOVE_ERROR', // New state for advanced mode error
}