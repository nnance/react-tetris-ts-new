import { startGame, startReducer } from "./StartState";
import { GameState, GameStates } from "./types";
import { stateTransition } from "./StateTransitions";

describe("when starting a new game", () => {
  const state: GameState = {
    level: 10,
    lineCount: 0,
    next: startReducer,
    score: 10,
    state: GameStates.initialized
  };
  it("should transition to running state", () => {
    expect(stateTransition(state, startGame()).state).toEqual(
      GameStates.running
    );
  });
});
