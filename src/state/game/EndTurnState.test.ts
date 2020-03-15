import { OBlock, IBlock } from "../../components/blocks";
import { gameCycle } from "./actions";
import { drawBlock, DrawableAction } from "../../components/drawing";
import { endTurnReducer } from "./EndTurnState";
import { startState, moveDown25Times } from "./testingHelpers";
import { completedLineReducer } from "./CompletedLineState";

describe("when turn is over", () => {
  const state = moveDown25Times({
    ...startState,
    lines: drawBlock(0, 19, IBlock[1])
  });
  it("should pick a new piece when it reaches the bottom", () => {
    expect(endTurnReducer(state, gameCycle()).next).not.toEqual(OBlock);
  });
  it("should transition to completed line state when full line", () => {
    const lines: DrawableAction[] = Array(5)
      .fill(OBlock)
      .reduce((prev, cur, idx) =>
        prev.concat(drawBlock(idx * 2, 18, cur[0]), [] as DrawableAction[])
      );
    expect(endTurnReducer({ ...state, lines }, gameCycle()).nextCycle).toEqual(
      completedLineReducer
    );
  });
});
