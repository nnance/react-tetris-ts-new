import { GameReducer, GameActions } from "./types";
import { startTransform } from "./transforms";

export const pausedReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame ? startTransform(state) : state;
