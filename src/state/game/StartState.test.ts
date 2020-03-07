import { startGame, startReducer } from "./StartState";
import { GameState, GameStates } from "./types";

describe("when creating a new game", () => {
  const state: GameState = {
    level: 10,
    lineCount: 0,
    next: startReducer,
    score: 10,
    state: GameStates.initialized
  };
  it("should set game defaults", () => {
    expect(startReducer(state, startGame()).level).toEqual(1);
  });
});
