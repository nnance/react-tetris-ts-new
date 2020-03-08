import { startGame, startReducer } from "./StartState";
import { GameState, GameStates } from "./types";
import { stateTransition } from "./StateTransitions";
import { runningReducer } from "./RunningState";

describe("when starting a new game", () => {
  const state: GameState = {
    next: startReducer,
    state: GameStates.initialized,
    score: { score: 10, level: 10, lineCount: 0 }
  };
  it("should transition to running state", () => {
    const newState = stateTransition(state, startGame());
    expect(newState.state).toEqual(GameStates.running);
    expect(newState.next).toEqual(runningReducer);
  });
});
