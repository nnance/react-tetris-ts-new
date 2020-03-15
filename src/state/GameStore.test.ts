import { startState, gameCycle25Times } from "./reducers/testingHelpers";
import { drawBlock } from "../components/drawing";
import { IBlock } from "../components/blocks";
import { gameCycle } from "./actions";
import { runningReducer } from "./reducers/RunningState";
import { endTurnReducer } from "./reducers/EndTurnState";

describe("when the game is running", () => {
  it("should cycle through multiple states and pieces", () => {
    const state = { ...startState, lines: drawBlock(0, 19, IBlock[1]) };
    const endState = gameCycle25Times(state);
    const newPieceState = endState.nextCycle(endState, gameCycle());
    expect(newPieceState.nextCycle).toEqual(runningReducer);

    const nextPieceState = gameCycle25Times(newPieceState);
    expect(nextPieceState.nextCycle).toEqual(endTurnReducer);
    expect(nextPieceState.piece.pos.y).toEqual(15);
  });
});
