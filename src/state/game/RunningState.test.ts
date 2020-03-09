import { GameState } from "./types";
import { runningReducer } from "./RunningState";
import { startGame } from "./actions";
import { initialState, gameFieldState } from "./transforms";

describe("when game is running", () => {
  const state: GameState = {
    nextCycle: runningReducer,
    ...initialState(),
    ...gameFieldState(),
    level: 10
  };
  it("should reset game on start game", () => {
    expect(runningReducer(state, startGame()).level).toEqual(1);
  });
});
