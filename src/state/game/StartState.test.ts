import { startGame, startReducer, initialState } from "./StartState";
import { GameState } from "./types";

describe("when creating a new game", () => {
  const state: GameState = {
    nextCycle: startReducer,
    ...initialState()
  };
  it("should set game defaults", () => {
    expect(startReducer(state, startGame()).level).toEqual(1);
  });
});
