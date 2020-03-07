import { GameReducer, GameActions, StartState, GameActionTypes } from "./types";

export const initialState = (): StartState => ({
  score: 0,
  level: 1,
  lineCount: 0
});

export const startGame = (): GameActionTypes => ({
  type: GameActions.startGame
});

export const startReducer: GameReducer = (state, action) =>
  action.type === GameActions.startGame
    ? { ...state, ...initialState() }
    : state;
