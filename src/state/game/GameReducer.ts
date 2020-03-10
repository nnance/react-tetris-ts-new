import { GameState, GameReducer, GameActions } from "./types";
import { runningReducer } from "./RunningState";
import { pausedReducer } from "./PausedState";

const stateTransition: GameReducer = ({ nextCycle, ...rest }, { type }) => {
  return type === GameActions.startGame
    ? { ...rest, nextCycle: runningReducer }
    : nextCycle === runningReducer && type === GameActions.pauseGame
    ? { ...rest, nextCycle: pausedReducer }
    : nextCycle === pausedReducer && type === GameActions.resumeGame
    ? { ...rest, nextCycle: runningReducer }
    : { ...rest, nextCycle };
};

export const gameReducer: GameReducer = (state, action): GameState => {
  const newState = state.nextCycle(state, action);
  return stateTransition(newState, action);
};
