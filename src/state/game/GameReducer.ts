import { GameState, GameReducer, GameActions } from "./types";
import { runningReducer } from "./RunningState";
import { pausedReducer } from "./PausedState";
import { atBottom } from "./transforms";
import { turnOverReducer } from "./TurnOverState";

const stateTransition: GameReducer = ({ nextCycle, ...rest }, { type }) => {
  return type === GameActions.startGame
    ? { ...rest, nextCycle: runningReducer }
    : nextCycle === runningReducer && type === GameActions.pauseGame
    ? { ...rest, nextCycle: pausedReducer }
    : nextCycle === runningReducer && atBottom(rest.piece)
    ? { ...rest, nextCycle: turnOverReducer }
    : nextCycle === pausedReducer && type === GameActions.resumeGame
    ? { ...rest, nextCycle: runningReducer }
    : { ...rest, nextCycle };
};

export const gameReducer: GameReducer = (state, action): GameState => {
  const newState = state.nextCycle(state, action);
  return stateTransition(newState, action);
};
