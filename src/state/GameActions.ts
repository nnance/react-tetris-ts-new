import { GameState } from "../types";
import {
  BoardPiece,
  Piece,
  drawBlock,
  drawBoard,
  BlockDrawer,
  DrawableAction,
  BlockState
} from "../components/drawing";
import { blocks } from "../components/blocks";
import { GameRules } from "./GameRules";

export const updateBoard = drawBoard(20, 10);

export type GameSetter = (state: GameState) => GameState;

const drawPiece = (piece: BoardPiece): DrawableAction[] =>
  drawBlock(piece.pos.x, piece.pos.y, piece.drawer);

type BoundaryPredicate = (action: DrawableAction) => boolean;

const checkBoundary = (
  piece: BoardPiece,
  predicate: BoundaryPredicate
): boolean => drawPiece(piece).find(predicate) !== undefined;

const atBottom = (piece: BoardPiece): boolean =>
  checkBoundary(piece, action => action.y >= updateBoard([]).length - 1);

const atLeft = (piece: BoardPiece): boolean =>
  checkBoundary(piece, action => action.x === 0);

const atRight = (piece: BoardPiece): boolean => {
  const board = updateBoard([]);
  return checkBoundary(piece, action => action.x >= board[0].length - 1);
};

const didCollide = (piece: BoardPiece, game: GameState): boolean => {
  const newBoard = updateBoard(game.lines);
  return checkBoundary(
    piece,
    action => newBoard[action.y][action.x] === BlockState.on
  );
};

const findFullRows = (actions: DrawableAction[]): number[] =>
  actions
    .reduce((prev, cur) => {
      prev[cur.y] += 1;
      return prev;
    }, Array(20).fill(0))
    .reduce(
      (prev, row, index) => (row === 10 ? prev.concat([index]) : prev),
      [] as number[]
    );

const highlightLines = (
  fullRows: number[],
  actions: DrawableAction[]
): DrawableAction[] =>
  actions.reduce((prev, action) => {
    const newAction = fullRows.reduce(
      (prev, row) =>
        prev.y === row ? { ...prev, state: BlockState.highlight } : prev,
      { ...action }
    );
    return prev.concat(newAction);
  }, [] as DrawableAction[]);

const eraseLines = (
  fullRows: number[],
  actions: DrawableAction[]
): DrawableAction[] => {
  const removeLines = (
    prev: DrawableAction[],
    action: DrawableAction
  ): DrawableAction[] =>
    fullRows.find(row => row === action.y) ? prev : prev.concat(action);

  const calculateDrop = (action: DrawableAction): DrawableAction =>
    fullRows.reduce(
      (prev, row) => (prev.y < row ? { ...prev, y: prev.y + 1 } : prev),
      { ...action }
    );

  const emptyBoard = [] as DrawableAction[];

  return actions.reduce(removeLines, emptyBoard).map(calculateDrop);
};

export const pieceToBoardPiece = (piece: Piece): BoardPiece => ({
  pos: { x: 1, y: 0 },
  piece,
  isAtBottom: false,
  drawer: piece[0]
});

export const pickNewPiece = (): Piece => {
  const pieceIndex = Math.floor(Math.random() * blocks.length);
  return blocks[pieceIndex];
};

const getNewDrawer = (boarPiece: BoardPiece): BlockDrawer => {
  const idx = boarPiece.piece.findIndex(drawer => drawer === boarPiece.drawer);
  return boarPiece.piece[idx === boarPiece.piece.length - 1 ? 0 : idx + 1];
};

const rotationBlocked = (piece: BoardPiece): boolean => {
  const newPiece = { ...piece, drawer: getNewDrawer(piece) };
  const board = updateBoard([]);
  return checkBoundary(newPiece, action => action.x >= board[0].length);
};

export const rotatePiece: GameSetter = state =>
  !rotationBlocked(state.piece)
    ? {
        ...state,
        piece: { ...state.piece, drawer: getNewDrawer(state.piece) }
      }
    : state;

const endPieceMovement: GameSetter = state => {
  const lines = state.lines.concat(drawPiece(state.piece));
  const fullRows = findFullRows(lines);
  return fullRows.length > 0
    ? {
        ...state,
        lines: highlightLines(fullRows, lines),
        tetrisLines: fullRows,
        tetrisCycle: 1
      }
    : {
        ...state,
        piece: pieceToBoardPiece(state.next),
        next: pickNewPiece(),
        lines
      };
};

const decrementTetrisCycle: GameSetter = state => ({
  ...state,
  tetrisCycle: state.tetrisCycle - 1
});

const endTetrisCycle = (rules: GameRules, state: GameState): GameState => {
  const newScore = rules(state.tetrisLines.length, {
    lineCount: state.lineCount,
    level: state.level,
    score: state.score,
    gravity: state.gravity
  });

  return {
    ...state,
    tetrisLines: [],
    ...newScore,
    lines: eraseLines(state.tetrisLines, state.lines),
    piece: pieceToBoardPiece(state.next),
    next: pickNewPiece()
  };
};

const incrementYPos: GameSetter = state => ({
  ...state,
  piece: {
    ...state.piece,
    pos: { ...state.piece.pos, y: state.piece.pos.y + 1 }
  }
});

export type GameCycle = (rules: GameRules) => GameSetter;

export const gameCycle: GameCycle = rules => (state): GameState => {
  const newState = incrementYPos(state);

  return state.tetrisLines.length > 0 && state.tetrisCycle > 0
    ? decrementTetrisCycle(state)
    : state.tetrisLines.length > 0
    ? endTetrisCycle(rules, state)
    : atBottom(state.piece) || didCollide(newState.piece, state)
    ? endPieceMovement(state)
    : !state.paused
    ? newState
    : state;
};

type ScoreIncrement = (value: number) => GameSetter;

export const incrementScore: ScoreIncrement = value => (state): GameState => ({
  ...state,
  score: state.score + value
});

export const startGame: GameSetter = state => ({
  ...state,
  paused: false,
  started: true
});

export const pauseGame: GameSetter = state => ({
  ...state,
  paused: true
});

export const resumeGame: GameSetter = state => ({
  ...state,
  paused: false
});

export const moveDown: GameSetter = state => {
  const newState = incrementYPos(state);

  return atBottom(state.piece) || didCollide(newState.piece, state)
    ? state
    : newState;
};

export const moveRight: GameSetter = state => {
  const newState = {
    ...state,
    piece: {
      ...state.piece,
      pos: { ...state.piece.pos, x: state.piece.pos.x + 1 }
    }
  };

  return atRight(state.piece) || didCollide(newState.piece, state)
    ? state
    : newState;
};

export const moveLeft: GameSetter = state => {
  const newState = {
    ...state,
    piece: {
      ...state.piece,
      pos: { ...state.piece.pos, x: state.piece.pos.x - 1 }
    }
  };

  return atLeft(state.piece) || didCollide(newState.piece, state)
    ? state
    : newState;
};
