import { GameActions, GameActionTypes, GameReducer, ScoreState } from "./types";

export const initialState = (): ScoreState => ({
  score: 0,
  level: 1,
  lineCount: 0
});

export const startGame = (): GameActionTypes => ({
  type: GameActions.startGame
});

export const startReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame ? { ...state, score: initialState() } : state;
