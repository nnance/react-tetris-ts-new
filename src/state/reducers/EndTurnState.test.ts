import { OBlock, IBlock } from "../../components/blocks";
import { gameCycle } from "../actions";
import { drawBlock } from "../../components/drawing";
import { startState, moveDown25Times, triggerReducer } from "./testingHelpers";
import { DrawableAction } from "../../types";
import { runningReducer } from "./RunningState";

describe("when turn is over", () => {
  const state = moveDown25Times({
    ...startState,
    lines: drawBlock(0, 19, IBlock[1])
  });
  it("should pick a new piece when it reaches the bottom", () => {
    expect(triggerReducer(state, gameCycle).next).not.toEqual(OBlock);
  });
  it("should transition to completed line state when full line", () => {
    const lines: DrawableAction[] = Array(5)
      .fill(OBlock)
      .reduce((prev, cur, idx) =>
        prev.concat(drawBlock(idx * 2, 18, cur[0]), [] as DrawableAction[])
      );
    expect(triggerReducer({ ...state, lines }, gameCycle).nextCycle).toEqual(
      runningReducer
    );
  });
});
