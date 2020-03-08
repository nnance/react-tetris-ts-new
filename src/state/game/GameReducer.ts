import { GameState, GameReducer } from "./types";
import { stateTransition } from "./StateTransitions";

export const gameReducer: GameReducer = (state, action): GameState =>
  stateTransition(state.nextCycle(state, action), action);