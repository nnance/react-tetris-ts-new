import { runningReducer } from "./RunningState";
import {
  startGame,
  moveDown,
  moveRight,
  moveLeft,
  gameCycle,
  rotatePiece
} from "./actions";
import { IBlock } from "../../components/blocks";
import { drawBlock } from "../../components/drawing";
import { endTurnReducer } from "./EndTurnState";
import {
  startState,
  moveDown25Times,
  moveRight12Times,
  moveLeft6Times
} from "./testingHelpers";
import { pieceToBoardPiece } from "../GameActions";

describe("when game is running", () => {
  it("should reset game on start game", () => {
    expect(runningReducer(startState, startGame()).level).toEqual(1);
  });
  it("should move down on a game cycle", () => {
    expect(runningReducer(startState, gameCycle()).piece.pos.y).toEqual(1);
  });
  describe("when rotate action", () => {
    it("should rotate the piece", () => {
      const state = { ...startState, piece: pieceToBoardPiece(IBlock) };
      expect(runningReducer(state, rotatePiece()).piece.drawer).toEqual(
        IBlock[1]
      );
    });
    it("should not rotate when it collides", () => {
      const state = runningReducer(
        {
          ...startState,
          piece: pieceToBoardPiece(IBlock),
          lines: drawBlock(2, 0, IBlock[1])
        },
        rotatePiece()
      );
      expect(state.piece.drawer).toEqual(IBlock[0]);
    });
  });
  describe("when down action", () => {
    it("should move when not at the bottom", () => {
      expect(runningReducer(startState, moveDown()).piece.pos.y).toEqual(1);
    });
    it("should stop at the bottom", () => {
      expect(moveDown25Times(startState).piece.pos.y).toEqual(18);
    });
    it("should stop when it collides", () => {
      const state = { ...startState, lines: drawBlock(0, 2, IBlock[1]) };
      expect(runningReducer(state, moveDown()).piece.pos.y).toEqual(0);
    });
    it("should transition to end turn when it collides at the bottom", () => {
      const state = { ...startState, lines: drawBlock(0, 2, IBlock[1]) };
      expect(runningReducer(state, moveDown()).nextCycle).toEqual(
        endTurnReducer
      );
    });
  });

  describe("when right action", () => {
    it("should move when not at the edge", () => {
      expect(runningReducer(startState, moveRight()).piece.pos.x).toEqual(2);
    });
    it("should stop at the edge", () => {
      expect(moveRight12Times(startState).piece.pos.x).toEqual(8);
    });
    it("should stop when it collides", () => {
      const state = { ...startState, lines: drawBlock(3, 0, IBlock[0]) };
      expect(runningReducer(state, moveRight()).piece.pos.x).toEqual(1);
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
      const state = { ...startState, lines: drawBlock(0, 0, IBlock[0]) };
      expect(runningReducer(state, moveLeft()).piece.pos.x).toEqual(1);
    });
  });
});
