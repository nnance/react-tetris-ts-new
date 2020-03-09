import { startReducer } from "./StartState";
import { GameState } from "./types";
import { startGame } from "./actions";
import { initialState, gameFieldState } from "./transforms";

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
