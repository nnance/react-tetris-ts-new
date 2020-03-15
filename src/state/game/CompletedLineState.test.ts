import { OBlock, IBlock } from "../../components/blocks";
import { drawBlock } from "../../components/drawing";
import { startState, triggerReducer } from "./testingHelpers";
import { runningReducer } from "./RunningState";
import { completedLineTransform } from "./CompletedLineState";
import { gameCycle } from "./actions";
import { GameState } from "./types";

const cycleTrigger = (state: GameState): GameState =>
  triggerReducer(state, gameCycle, 2);

const state = completedLineTransform(
  {
    ...startState,
    lines: drawBlock(0, 19, IBlock[1]),
    score: 100,
    level: 3,
    lineCount: 9
  },
  [18, 19]
);

describe("when completed state is cycling", () => {
  it("should pick a new piece when the cycle is over", () => {
    expect(cycleTrigger(state).next).not.toEqual(OBlock);
  });
  it("should transition to running state when cycle is over", () => {
    expect(cycleTrigger(state).nextCycle).toEqual(runningReducer);
  });
  it("should multiply score by level", () => {
    expect(cycleTrigger(state).score).toEqual(1000);
  });

  it("should leave remainder on line count", () => {
    expect(cycleTrigger(state).lineCount).toEqual(1);
  });
});
