import { OBlock } from "../../components/blocks";
import { gameCycle, moveDown } from "../actions";
import { drawBlock } from "../../components/drawing";
import { startState, triggerReducer } from "./testingHelpers";
import { DrawableAction } from "../../types";
import { runningReducer } from "./RunningState";

describe("when turn is over", () => {
  it("should pick a new piece when it reaches the bottom", () => {
    expect(triggerReducer(startState, moveDown, 19).piece.pos.y).toEqual(0);
  });
  it("should transition to completed line state when full line", () => {
    const lines: DrawableAction[] = Array(5)
      .fill(OBlock)
      .reduce((prev, cur, idx) =>
        prev.concat(drawBlock(idx * 2, 18, cur[0]), [] as DrawableAction[])
      );
    expect(
      triggerReducer({ ...startState, lines }, gameCycle).nextCycle
    ).toEqual(runningReducer);
  });
});
