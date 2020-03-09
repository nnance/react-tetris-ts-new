import { GameState } from "./types";
import { runningReducer } from "./RunningState";
import { startGame } from "./actions";

describe("when game is running", () => {
  const state: GameState = {
    nextCycle: runningReducer,
    level: 10,
    score: 1000,
    lineCount: 100
  };
  it("should reset game on start game", () => {
    expect(runningReducer(state, startGame()).level).toEqual(1);
  });
});
