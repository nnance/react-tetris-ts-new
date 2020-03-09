import { startReducer } from "./StartState";
import { GameState } from "./types";
import { stateTransition } from "./StateTransitions";
import { runningReducer } from "./RunningState";
import { startGame } from "./actions";
import { initialState, gameFieldState } from "./transforms";

describe("when starting a new game", () => {
  const state: GameState = {
    nextCycle: startReducer,
    ...initialState(),
    ...gameFieldState()
  };
  it("should transition to running state", () => {
    const newState = stateTransition(state, startGame());
    expect(newState.nextCycle).toEqual(runningReducer);
  });
});
