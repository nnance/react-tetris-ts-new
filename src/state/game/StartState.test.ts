import { startGame } from "./actions";
import { startReducer } from "./StartState";
import { startState } from "./testingHelpers";

describe("when creating a new game", () => {
  it("should reset game on start game", () => {
    expect(startReducer(startState, startGame()).level).toEqual(1);
  });
});
