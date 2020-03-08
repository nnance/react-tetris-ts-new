import { GameReducer, GameActions } from "./types";
import { runningReducer } from "./RunningState";
import { startReducer } from "./StartState";

export const stateTransition: GameReducer = (
  { nextCycle: next, ...rest },
  { type }
) => {
  return next === startReducer && type === GameActions.startGame
    ? { ...rest, nextCycle: runningReducer }
    : { ...rest, nextCycle: next };
};
