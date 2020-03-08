import {
  GameActions,
  GameActionTypes,
  GameReducer,
  ScoreState,
  GameState
} from "./types";

export const initialState = (): ScoreState => ({
  score: 0,
  level: 1,
  lineCount: 0
});

export const startGameAction = (): GameActionTypes => ({
  type: GameActions.startGame
});

export const startTransform = ({ nextCycle }: GameState): GameState => ({
  nextCycle,
  ...initialState()
});

export const startReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame ? startTransform(state) : state;
