import { pieceToBoardPiece, moveLeft, moveRight } from "./GameActions";
import { OBlock } from "../components/blocks";
import { GameState } from "../types";

const initialState: GameState = {
  piece: pieceToBoardPiece(OBlock),
  next: OBlock,
  score: 0,
  lineCount: 0,
  level: 1,
  paused: false,
  started: true,
  lines: [],
  tetrisLines: [],
  tetrisCycle: 0
};

const moveTimes = (
  count: number,
  movement: (state: GameState) => GameState
) => (state: GameState): GameState => {
  return Array(count)
    .fill(movement)
    .reduce((prev, cur) => cur(prev), state);
};

const moveLeft6Times = moveTimes(6, moveLeft);
const moveRight12Times = moveTimes(12, moveRight);

describe("when moving left", () => {
  test("should move when not at the edge", () => {
    expect(moveLeft(initialState).piece.pos.x).toBe(0);
  });
  test("should stop when at the edge of the board", () => {
    expect(moveLeft6Times(initialState).piece.pos.x).toBe(0);
  });
});

describe("when moving right", () => {
  test("should move when not at the edge", () => {
    expect(moveRight(initialState).piece.pos.x).toBe(2);
  });
  test("should stop when at the edge of the board", () => {
    expect(moveRight12Times(initialState).piece.pos.x).toBe(8);
  });
});
