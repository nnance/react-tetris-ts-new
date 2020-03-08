export enum GameStates {
  initialized,
  running,
  paused,
  levelingUp,
  ended
}

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

export type InitializedState = {
  state: GameStates;
  next: GameReducer;
};

export type ScoreState = {
  score: number;
  level: number;
  lineCount: number;
};

export type GameActionTypes =
  | { type: GameActions }
  | { type: GameActions.incrementScore; value: number };

export type GameState = InitializedState & {
  score?: ScoreState;
};

export type GameReducer = (
  state: GameState,
  action: GameActionTypes
) => GameState;
