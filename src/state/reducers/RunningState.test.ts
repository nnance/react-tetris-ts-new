import {
  startGame,
  moveDown,
  moveRight,
  moveLeft,
  gameCycle,
  rotatePiece
} from "../actions";
import { IBlock } from "../../components/blocks";
import { drawBlock } from "../../components/drawing";
import { startState, triggerReducer } from "./testingHelpers";
import { pieceToBoardPiece } from "./StartState";
import { runningReducer } from "./RunningState";

describe("when game is running", () => {
  it("should reset game on start game", () => {
    expect(triggerReducer(startState, startGame).level).toEqual(1);
  });
  it("should move down on a game cycle", () => {
    expect(triggerReducer(startState, gameCycle).piece.pos.y).toEqual(1);
  });
  describe("when rotate action", () => {
    it("should rotate the piece", () => {
      const state = { ...startState, piece: pieceToBoardPiece(IBlock) };
      expect(triggerReducer(state, rotatePiece).piece.drawer).toEqual(
        IBlock[1]
      );
    });
    it("should not rotate when it collides", () => {
      const state = {
        ...startState,
        piece: pieceToBoardPiece(IBlock),
        lines: drawBlock(2, 0, IBlock[1])
      };
      expect(triggerReducer(state, rotatePiece).piece.drawer).toEqual(
        IBlock[0]
      );
    });
  });
  describe("when down action", () => {
    it("should move when not at the bottom", () => {
      expect(triggerReducer(startState, moveDown).piece.pos.y).toEqual(1);
    });
    it("should stop at the bottom", () => {
      expect(triggerReducer(startState, moveDown, 19).piece.pos.y).toEqual(0);
    });
    it("should stop when it collides", () => {
      const state = { ...startState, lines: drawBlock(0, 2, IBlock[1]) };
      expect(triggerReducer(state, moveDown).piece.pos.y).toEqual(0);
    });
    it("should transition to running turn when it collides at the bottom", () => {
      const state = { ...startState, lines: drawBlock(0, 2, IBlock[1]) };
      expect(triggerReducer(state, moveDown).nextCycle).toEqual(runningReducer);
    });
  });

  describe("when right action", () => {
    it("should move when not at the edge", () => {
      expect(triggerReducer(startState, moveRight).piece.pos.x).toEqual(2);
    });
    it("should stop at the edge", () => {
      expect(triggerReducer(startState, moveRight, 12).piece.pos.x).toEqual(8);
    });
    it("should stop when it collides", () => {
      const state = { ...startState, lines: drawBlock(3, 0, IBlock[0]) };
      expect(triggerReducer(state, moveRight).piece.pos.x).toEqual(1);
    });
  });

  describe("when left action", () => {
    it("should move when not at the edge", () => {
      expect(triggerReducer(startState, moveLeft).piece.pos.x).toEqual(0);
    });
    it("should stop at the edge", () => {
      expect(triggerReducer(startState, moveLeft, 6).piece.pos.x).toEqual(0);
    });
    it("should stop when it collides", () => {
      const state = { ...startState, lines: drawBlock(0, 0, IBlock[0]) };
      expect(triggerReducer(state, moveLeft).piece.pos.x).toEqual(1);
    });
  });
});
