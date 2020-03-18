import { startState, triggerReducer } from "./reducers/testingHelpers";
import { drawBlock } from "../components/drawing";
import { IBlock } from "../components/blocks";
import { gameCycle } from "./actions";
import { runningReducer } from "./reducers/RunningState";

describe("when the game is running", () => {
  it("should cycle through multiple states and pieces", () => {
    const state = { ...startState, lines: drawBlock(0, 19, IBlock[1]) };
    const endState = triggerReducer(state, gameCycle, 18);
    expect(endState.piece.pos.y).toEqual(0);

    const nextPieceState = triggerReducer(endState, gameCycle, 16);
    expect(nextPieceState.nextCycle).toEqual(runningReducer);
    expect(nextPieceState.piece.pos.y).toEqual(0);
  });
});
