import { startGame, startReducer } from "./StartState";
import { GameState } from "./types";
import { stateTransition } from "./StateTransitions";
import { runningReducer } from "./RunningState";

describe("when starting a new game", () => {
  const state: GameState = {
    nextCycle: startReducer,
    score: 10,
    level: 10,
    lineCount: 0
  };
  it("should transition to running state", () => {
    const newState = stateTransition(state, startGame());
    expect(newState.nextCycle).toEqual(runningReducer);
  });
});
