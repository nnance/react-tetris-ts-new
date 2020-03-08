import { GameStates, GameReducer, GameActions } from "./types";
import { runningReducer } from "./RunningState";

export const stateTransition: GameReducer = ({ state, ...rest }, { type }) => {
  return state === GameStates.initialized && type === GameActions.startGame
    ? { ...rest, state: GameStates.running, next: runningReducer }
    : { ...rest, state };
};
