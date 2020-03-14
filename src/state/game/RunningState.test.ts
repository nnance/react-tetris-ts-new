import { runningReducer } from "./RunningState";
import { startGame, moveDown, moveRight, moveLeft, gameCycle } from "./actions";
import { IBlock } from "../../components/blocks";
import { drawBlock } from "../../components/drawing";
import { endTurnReducer } from "./EndTurnState";
import {
  startState,
  moveDown25Times,
  moveRight12Times,
  moveLeft6Times
} from "./testingHelpers";

describe("when game is running", () => {
  it("should reset game on start game", () => {
    expect(runningReducer(startState, startGame()).level).toEqual(1);
  });
  it("should move down on a game cycle", () => {
    expect(runningReducer(startState, gameCycle()).piece.pos.y).toEqual(1);
  });
  describe("when down action", () => {
    it("should move when not at the bottom", () => {
      expect(runningReducer(startState, moveDown()).piece.pos.y).toEqual(1);
    });
    it("should stop at the bottom", () => {
      expect(moveDown25Times(startState).piece.pos.y).toBe(18);
    });
    it("should stop when it collides", () => {
      const newState = { ...startState, lines: drawBlock(0, 2, IBlock[1]) };
      expect(runningReducer(newState, moveDown()).piece.pos.y).toBe(0);
    });
    it("should be at the bottom if it collides", () => {
      const newState = runningReducer(
        {
          ...startState,
          lines: drawBlock(0, 2, IBlock[1])
        },
        moveDown()
      );
      expect(newState.nextCycle).toEqual(endTurnReducer);
    });
  });

  describe("when right action", () => {
    it("should move when not at the edge", () => {
      expect(runningReducer(startState, moveRight()).piece.pos.x).toEqual(2);
    });
    it("should stop at the edge", () => {
      expect(moveRight12Times(startState).piece.pos.x).toBe(8);
    });
    it("should stop when it collides", () => {
      const newState = { ...startState, lines: drawBlock(3, 0, IBlock[0]) };
      expect(runningReducer(newState, moveRight()).piece.pos.x).toBe(1);
    });
  });

  describe("when left action", () => {
    it("should move when not at the edge", () => {
      expect(runningReducer(startState, moveLeft()).piece.pos.x).toEqual(0);
    });
    it("should stop at the edge", () => {
      expect(moveLeft6Times(startState).piece.pos.x).toEqual(0);
    });
    it("should stop when it collides", () => {
      const newState = { ...startState, lines: drawBlock(0, 0, IBlock[0]) };
      expect(runningReducer(newState, moveLeft()).piece.pos.x).toEqual(1);
    });
  });
});
