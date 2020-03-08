import { GameReducer, GameActions } from "./types";
import { startTransform } from "./StartState";

export const runningReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame ? startTransform(state) : state;
