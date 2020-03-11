import { decrementXPos, incrementXPos, incrementYPos } from "./transforms";
import { OBlock, IBlock } from "../../components/blocks";
import { GameState } from "./types";
import { drawBlock } from "../../components/drawing";
import { basicRules } from "../GameRules";
import { initialState as gameState } from "./transforms";
import { runningReducer } from "./RunningState";
import { pieceToBoardPiece } from "../GameActions";

const initialState: GameState = {
  nextCycle: runningReducer,
  ...gameState(),
  piece: pieceToBoardPiece(OBlock),
  next: OBlock,
  lines: [],
  gravity: 0
};

const moveTimes = (
  count: number,
  movement: (state: GameState) => GameState
) => (state: GameState): GameState => {
  return Array(count)
    .fill(movement)
    .reduce((prev, cur) => cur(prev), state);
};

const moveLeft6Times = moveTimes(6, decrementXPos);
const moveRight12Times = moveTimes(12, incrementXPos);
const moveDown25Times = moveTimes(25, incrementYPos);

describe("when moving left", () => {
  it("should move when not at the edge", () => {
    expect(decrementXPos(initialState).piece.pos.x).toBe(0);
  });
  it("should stop at the edge", () => {
    expect(moveLeft6Times(initialState).piece.pos.x).toBe(0);
  });
  it("should stop when it collides", () => {
    const state = { ...initialState, lines: drawBlock(0, 0, IBlock[0]) };
    expect(decrementXPos(state).piece.pos.x).toBe(1);
  });
});

describe("when moving right", () => {
  it("should move when not at the edge", () => {
    expect(incrementXPos(initialState).piece.pos.x).toBe(2);
  });
  it("should stop at the edge", () => {
    expect(moveRight12Times(initialState).piece.pos.x).toBe(8);
  });
  it("should stop when it collides", () => {
    const state = { ...initialState, lines: drawBlock(3, 0, IBlock[0]) };
    expect(incrementXPos(state).piece.pos.x).toBe(1);
  });
});

describe("when moving down", () => {
  it("should move when not at the bottom", () => {
    expect(incrementYPos(initialState).piece.pos.y).toBe(1);
  });
  it("should stop at the bottom", () => {
    expect(moveDown25Times(initialState).piece.pos.y).toBe(18);
  });
  it("should stop when it collides", () => {
    const state = { ...initialState, lines: drawBlock(0, 2, IBlock[1]) };
    expect(incrementYPos(state).piece.pos.y).toBe(0);
  });
});
