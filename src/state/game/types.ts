export enum GameActions {
  incrementScore,
  pauseGame,
  resumeGame,
  startGame,
  moveDown,
  moveRight,
  moveLeft,
  rotatePiece
}

export type BaseState = {
  nextCycle: GameReducer;
};

export type ScoreState = {
  score: number;
  level: number;
  lineCount: number;
};

export type GameActionTypes =
  | { type: GameActions }
  | { type: GameActions.incrementScore; value: number };

export type GameState = BaseState & ScoreState;

export type GameReducer = (
  state: GameState,
  action: GameActionTypes
) => GameState;
