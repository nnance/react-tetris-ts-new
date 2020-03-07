import { GameState, GameReducer } from "./types";
import { stateTransition } from "./StateTransitions";

export const gameReducer: GameReducer = (state, action): GameState =>
  stateTransition(state.next(state, action), action);
