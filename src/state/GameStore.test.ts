import { startState, triggerReducer } from "./reducers/testingHelpers";
import { drawBlock } from "../components/drawing";
import { IBlock } from "../components/blocks";
import { gameCycle } from "./actions";

describe("when the game is running", () => {
  it("should cycle through multiple states and pieces", () => {
    const state = { ...startState(), lines: drawBlock(0, 19, IBlock[1]) };
    const endState = triggerReducer(state, gameCycle, 18);
    expect(endState.piece.pos.y).toEqual(0);

    const nextPieceState = triggerReducer(endState, gameCycle, 15);
    expect(nextPieceState.piece.pos.y).toEqual(0);
  });
});
