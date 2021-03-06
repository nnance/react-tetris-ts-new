import {
  pieceToBoardPiece,
  moveLeft,
  moveRight,
  moveDown,
  incrementScore,
  pauseGame,
  resumeGame,
  rotatePiece,
  startGame,
  gameCycle
} from "./GameActions";
import { OBlock, IBlock } from "../components/blocks";
import { GameState } from "../types";
import { drawBlock } from "../components/drawing";
import { basicRules, initialScoreState } from "./GameRules";

const initialState: GameState = {
  ...initialScoreState,
  piece: pieceToBoardPiece(OBlock),
  next: OBlock,
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
const moveDown25Times = moveTimes(25, moveDown);

describe("when moving left", () => {
  it("should move when not at the edge", () => {
    expect(moveLeft(initialState).piece.pos.x).toBe(0);
  });
  it("should stop at the edge", () => {
    expect(moveLeft6Times(initialState).piece.pos.x).toBe(0);
  });
  it("should stop when it collides", () => {
    const state = { ...initialState, lines: drawBlock(0, 0, IBlock[0]) };
    expect(moveLeft(state).piece.pos.x).toBe(1);
  });
});

describe("when moving right", () => {
  it("should move when not at the edge", () => {
    expect(moveRight(initialState).piece.pos.x).toBe(2);
  });
  it("should stop at the edge", () => {
    expect(moveRight12Times(initialState).piece.pos.x).toBe(8);
  });
  it("should stop when it collides", () => {
    const state = { ...initialState, lines: drawBlock(3, 0, IBlock[0]) };
    expect(moveRight(state).piece.pos.x).toBe(1);
  });
});

describe("when moving down", () => {
  it("should move when not at the bottom", () => {
    expect(moveDown(initialState).piece.pos.y).toBe(1);
  });
  it("should stop at the bottom", () => {
    expect(moveDown25Times(initialState).piece.pos.y).toBe(18);
  });
  it("should stop when it collides", () => {
    const state = { ...initialState, lines: drawBlock(0, 2, IBlock[1]) };
    expect(moveDown(state).piece.pos.y).toBe(0);
  });
});

it("should add to the score", () => {
  expect(incrementScore(1)(initialState).score).toBe(1);
});

it("should pause the game", () => {
  expect(pauseGame(initialState).paused).toBeTruthy();
});

it("should resume the game", () => {
  const state = { ...initialState, paused: true };
  expect(resumeGame(state).paused).toBeFalsy();
});

it("should rotate the piece", () => {
  const state = { ...initialState, piece: pieceToBoardPiece(IBlock) };
  expect(rotatePiece(state).piece.drawer).toEqual(IBlock[1]);
});

it("should start the game", () => {
  const state = { ...initialState, paused: true, started: false };
  expect(startGame(state).started).toBeTruthy();
});

describe("when the game cycles", () => {
  const basicGameCycle = gameCycle(basicRules);

  it("should pick a new piece when it reaches the bottom", () => {
    const state = moveDown25Times({
      ...initialState,
      lines: drawBlock(0, 19, IBlock[1])
    });
    expect(basicGameCycle(state).next).not.toEqual(OBlock);
  });

  it("should multiply score by level", () => {
    const state = {
      ...initialState,
      score: 100,
      tetrisLines: [19, 18],
      level: 3
    };
    expect(basicGameCycle(state).score).toEqual(1000);
  });

  it("should leave remainder on line count", () => {
    const state = {
      ...initialState,
      tetrisLines: [19, 18],
      lineCount: 9
    };
    expect(basicGameCycle(state).lineCount).toEqual(1);
  });
});
