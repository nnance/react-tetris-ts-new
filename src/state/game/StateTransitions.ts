import { GameReducer, GameActions } from "./types";
import { runningReducer } from "./RunningState";
import { startReducer } from "./StartState";
import { pausedReducer } from "./PausedState";

export const stateTransition: GameReducer = (
  { nextCycle, ...rest },
  { type }
) => {
  return nextCycle === startReducer && type === GameActions.startGame
    ? { ...rest, nextCycle: runningReducer }
    : nextCycle === runningReducer && type === GameActions.pauseGame
    ? { ...rest, nextCycle: pausedReducer }
    : nextCycle === pausedReducer && type === GameActions.resumeGame
    ? { ...rest, nextCycle: runningReducer }
    : { ...rest, nextCycle };
};
