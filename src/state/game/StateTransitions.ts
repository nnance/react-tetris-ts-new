import { GameStates, GameReducer, GameActions } from "./types";
import { runningState } from "./RunningState";

export const stateTransition: GameReducer = ({ state, ...rest }, { type }) =>
  state === GameStates.initialized && type === GameActions.startGame
    ? { ...rest, state: GameStates.running, next: runningState }
    : { ...rest, state };
