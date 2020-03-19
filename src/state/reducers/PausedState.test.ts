import { startGame } from "../actions";
import { runningReducer } from "./RunningState";
import { startState, triggerReducer } from "./testingHelpers";

describe("when game is paused", () => {
  it("should reset game on start game", () => {
    expect(triggerReducer(startState(), startGame).level).toEqual(1);
  });
  it("should transition to running state", () => {
    expect(triggerReducer(startState(), startGame).nextCycle).toEqual(
      runningReducer
    );
  });
});
