import { startGame } from "../actions";
import { startReducer } from "./StartState";
import { startState } from "./testingHelpers";
import { runningReducer } from "./RunningState";

describe("when creating a new game", () => {
  it("should reset game on start game", () => {
    expect(startReducer(startState, startGame()).nextCycle).toEqual(
      runningReducer
    );
  });
  it("should reset to the basic rules starting state", () => {
    expect(startReducer(startState, startGame()).gravity).toEqual(1000);
  });
});
