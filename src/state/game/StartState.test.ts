import { startGame, startReducer } from "./StartState";
import { GameStates, InitializedState } from "./types";

describe("when creating a new game", () => {
  const state: InitializedState = {
    state: GameStates.initialized,
    next: startReducer
  };
  it("should set game defaults", () => {
    expect(startReducer(state, startGame()).score?.level).toEqual(1);
  });
});
