import { GameState, GameActionTypes } from "./types";
import { runningReducer } from "./RunningState";
import { startGame, moveDown, moveRight, moveLeft } from "./actions";
import { initialState, gameFieldState } from "./StartState";
import { pieceToBoardPiece } from "../GameActions";
import { OBlock, IBlock } from "../../components/blocks";
import { drawBlock } from "../../components/drawing";
import { turnOverReducer } from "./TurnOverState";

const state: GameState = {
  nextCycle: runningReducer,
  ...initialState(),
  ...gameFieldState(),
  piece: pieceToBoardPiece(OBlock),
  next: OBlock,
  level: 10
};

const moveTimes = (count: number, movement: () => GameActionTypes) => (
  state: GameState
): GameState => {
  return Array(count)
    .fill(movement)
    .reduce((prev, cur) => runningReducer(prev, cur()), state);
};

const moveLeft6Times = moveTimes(6, moveLeft);
const moveRight12Times = moveTimes(12, moveRight);
const moveDown25Times = moveTimes(25, moveDown);

describe("when game is running", () => {
  it("should reset game on start game", () => {
    expect(runningReducer(state, startGame()).level).toEqual(1);
  });
  describe("when down action", () => {
    it("should move when not at the bottom", () => {
      expect(runningReducer(state, moveDown()).piece.pos.y).toEqual(1);
    });
    it("should stop at the bottom", () => {
      expect(moveDown25Times(state).piece.pos.y).toBe(18);
    });
    it("should stop when it collides", () => {
      const newState = { ...state, lines: drawBlock(0, 2, IBlock[1]) };
      expect(runningReducer(newState, moveDown()).piece.pos.y).toBe(0);
    });
    it("should be at the bottom if it collides", () => {
      const newState = runningReducer(
        {
          ...state,
          lines: drawBlock(0, 2, IBlock[1])
        },
        moveDown()
      );
      expect(newState.nextCycle).toEqual(turnOverReducer);
    });
  });

  describe("when right action", () => {
    it("should move when not at the edge", () => {
      expect(runningReducer(state, moveRight()).piece.pos.x).toEqual(2);
    });
    it("should stop at the edge", () => {
      expect(moveRight12Times(state).piece.pos.x).toBe(8);
    });
    it("should stop when it collides", () => {
      const newState = { ...state, lines: drawBlock(3, 0, IBlock[0]) };
      expect(runningReducer(newState, moveRight()).piece.pos.x).toBe(1);
    });
  });

  describe("when left action", () => {
    it("should move when not at the edge", () => {
      expect(runningReducer(state, moveLeft()).piece.pos.x).toEqual(0);
    });
    it("should stop at the edge", () => {
      expect(moveLeft6Times(state).piece.pos.x).toEqual(0);
    });
    it("should stop when it collides", () => {
      const newState = { ...state, lines: drawBlock(0, 0, IBlock[0]) };
      expect(runningReducer(newState, moveLeft()).piece.pos.x).toEqual(1);
    });
  });
});
