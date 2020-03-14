import { GameReducer, GameActions } from "./types";
import { runningTransform } from "./RunningState";
import { startTransform } from "./StartState";

export const pausedReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame
    ? startTransform()
    : type === GameActions.resumeGame
    ? runningTransform(state)
    : state;
