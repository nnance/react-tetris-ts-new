import { GameReducer, GameActions } from "./types";
import { startTransform } from "./transforms";
import { runningReducer } from "./RunningState";

export const pausedReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame
    ? startTransform(state)
    : type === GameActions.resumeGame
    ? { ...state, nextCycle: runningReducer }
    : state;
