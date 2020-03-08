import { startGameAction, startReducer, initialState } from "./StartState";
import { GameState } from "./types";
import { stateTransition } from "./StateTransitions";
import { runningReducer } from "./RunningState";

describe("when starting a new game", () => {
  const state: GameState = {
    nextCycle: startReducer,
    ...initialState()
  };
  it("should transition to running state", () => {
    const newState = stateTransition(state, startGameAction());
    expect(newState.nextCycle).toEqual(runningReducer);
  });
});
