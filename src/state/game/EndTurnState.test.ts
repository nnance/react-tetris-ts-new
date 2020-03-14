import { OBlock, IBlock } from "../../components/blocks";
import { moveDown } from "./actions";
import { drawBlock } from "../../components/drawing";
import { endTurnReducer } from "./EndTurnState";
import { startState, moveDown25Times } from "./testingHelpers";

describe("when turn is over", () => {
  it("should pick a new piece when it reaches the bottom", () => {
    const state = moveDown25Times({
      ...startState,
      lines: drawBlock(0, 19, IBlock[1])
    });
    expect(endTurnReducer(state, moveDown()).next).not.toEqual(OBlock);
  });
});
