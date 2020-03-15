import { pausedReducer } from "./PausedState";
import { startGame } from "../actions";
import { runningReducer } from "./RunningState";
import { startState } from "./testingHelpers";

describe("when game is paused", () => {
  it("should reset game on start game", () => {
    expect(pausedReducer(startState, startGame()).level).toEqual(1);
  });
  it("should transition to running state", () => {
    expect(pausedReducer(startState, startGame()).nextCycle).toEqual(
      runningReducer
    );
  });
});
