import { GameActions, GameReducer } from "./types";
import { startTransform } from "./transforms";

export const startReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame ? startTransform(state) : state;
