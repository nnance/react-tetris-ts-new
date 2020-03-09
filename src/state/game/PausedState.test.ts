import { GameState } from "./types";
import { pausedReducer } from "./PausedState";
import { startGame } from "./actions";
import { initialState } from "./transforms";

describe("when game is paused", () => {
  const state: GameState = {
    nextCycle: pausedReducer,
    ...initialState(),
    level: 10
  };
  it("should reset game on start game", () => {
    expect(pausedReducer(state, startGame()).level).toEqual(1);
  });
});
