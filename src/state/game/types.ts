import {
  BoardPiece,
  Piece,
  DrawableAction,
  BoardDrawer
} from "../../components/drawing";

export enum GameActions {
  incrementScore,
  pauseGame,
  resumeGame,
  startGame,
  moveDown,
  moveRight,
  moveLeft,
  rotatePiece,
  gameCycle
}

export type BaseState = {
  nextCycle: GameReducer;
};

export type ScoreState = {
  score: number;
  level: number;
  lineCount: number;
};

export type GameFieldState = {
  piece: BoardPiece;
  next: Piece;
  board: BoardDrawer;
  lines: DrawableAction[];
  gravity: number;
};

export type FullState = BaseState & ScoreState & GameFieldState;

export type CompletedState = FullState & {
  completed: {
    lines: number[];
    cycleCount: number;
  };
};

export type GameActionTypes =
  | { type: GameActions }
  | { type: GameActions.incrementScore; value: number };

export type GameState = FullState | CompletedState;

export const isCompletedState = (
  state: FullState | CompletedState
): state is CompletedState => (state as CompletedState).completed !== undefined;

export type GameTransform = (state: GameState) => GameState;

export type GameReducer = (
  state: GameState,
  action: GameActionTypes
) => GameState;
