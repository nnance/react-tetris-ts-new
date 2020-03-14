import { GameState } from "./types";
import { pausedReducer } from "./PausedState";
import { startGame } from "./actions";
import { initialState, gameFieldState } from "./StartState";
import { runningReducer } from "./RunningState";

describe("when game is paused", () => {
  const state: GameState = {
    nextCycle: pausedReducer,
    ...initialState(),
    ...gameFieldState(),
    level: 10
  };
  it("should reset game on start game", () => {
    expect(pausedReducer(state, startGame()).level).toEqual(1);
  });
  it("should transition to running state", () => {
    expect(pausedReducer(state, startGame()).nextCycle).toEqual(runningReducer);
  });
});
