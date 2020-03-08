import { gameReducer } from "./GameReducer";
import { GameState } from "./types";
import { startReducer, initialState, startGameAction } from "./StartState";
import { runningReducer } from "./RunningState";

describe("when starting a new game", () => {
  const state: GameState = {
    nextCycle: startReducer,
    ...initialState()
  };
  it("should transition to running state", () => {
    expect(gameReducer(state, startGameAction()).nextCycle).toEqual(
      runningReducer
    );
  });
});

describe("when game is running", () => {
  const state: GameState = {
    nextCycle: runningReducer,
    level: 10,
    score: 1000,
    lineCount: 100
  };
  it("should reset game on start game", () => {
    expect(gameReducer(state, startGameAction()).level).toEqual(1);
  });
});
