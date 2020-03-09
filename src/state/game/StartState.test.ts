import { startReducer } from "./StartState";
import { GameState } from "./types";
import { startGame } from "./actions";
import { initialState } from "./transforms";

describe("when creating a new game", () => {
  const state: GameState = {
    nextCycle: startReducer,
    ...initialState()
  };
  it("should set game defaults", () => {
    expect(startReducer(state, startGame()).level).toEqual(1);
  });
});
