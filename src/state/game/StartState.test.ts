import { GameState } from "./types";
import { startGame } from "./actions";
import { startReducer, initialState, gameFieldState } from "./StartState";

describe("when creating a new game", () => {
  const state: GameState = {
    nextCycle: startReducer,
    ...initialState(),
    ...gameFieldState()
  };
  it("should reset game on start game", () => {
    expect(startReducer(state, startGame()).level).toEqual(1);
  });
});
