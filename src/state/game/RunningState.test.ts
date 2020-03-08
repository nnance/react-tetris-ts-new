import { GameState } from "./types";
import { startGameAction } from "./StartState";
import { runningReducer } from "./RunningState";

describe("when game is running", () => {
  const state: GameState = {
    nextCycle: runningReducer,
    level: 10,
    score: 1000,
    lineCount: 100
  };
  it("should reset game on start game", () => {
    expect(runningReducer(state, startGameAction()).level).toEqual(1);
  });
});
