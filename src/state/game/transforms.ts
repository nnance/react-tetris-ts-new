import { ScoreState, GameState, GameFieldState } from "./types";
import { pickNewPiece, pieceToBoardPiece, updateBoard } from "../GameActions";
import {
  BoardPiece,
  BlockState,
  DrawableAction,
  drawBlock,
  DrawableGrid
} from "../../components/drawing";

type BoundaryPredicate = (action: DrawableAction) => boolean;

export const initialState = (): ScoreState => ({
  score: 0,
  level: 1,
  lineCount: 0
});

export const gameFieldState = (): GameFieldState => ({
  piece: pieceToBoardPiece(pickNewPiece()),
  next: pickNewPiece(),
  lines: [],
  gravity: 500
});

export const startTransform = ({ nextCycle }: GameState): GameState => ({
  nextCycle,
  ...initialState(),
  ...gameFieldState()
});

const drawPiece = (piece: BoardPiece): DrawableAction[] =>
  drawBlock(piece.pos.x, piece.pos.y, piece.drawer);

const checkBoundary = (
  piece: BoardPiece,
  predicate: BoundaryPredicate
): boolean => drawPiece(piece).find(predicate) !== undefined;

const didCollide = (piece: BoardPiece, board: DrawableGrid): boolean =>
  checkBoundary(piece, action => board[action.y][action.x] === BlockState.on);

export const atBottom = ({ piece, lines }: GameState): boolean => {
  const board = updateBoard(lines);
  return (
    didCollide(piece, board) ||
    checkBoundary(piece, action => action.y >= board.length - 1)
  );
};

const atLeft = ({ piece, lines }: GameState): boolean => {
  const board = updateBoard(lines);
  return (
    didCollide(piece, board) || checkBoundary(piece, action => action.x === 0)
  );
};

const atRight = ({ piece, lines }: GameState): boolean => {
  const board = updateBoard(lines);
  return (
    didCollide(piece, board) ||
    checkBoundary(piece, action => action.x >= board[0].length - 1)
  );
};

export const incrementYPos = (state: GameState): GameState =>
  atBottom(state)
    ? state
    : {
        ...state,
        piece: {
          ...state.piece,
          pos: { ...state.piece.pos, y: state.piece.pos.y + 1 }
        }
      };

export const incrementXPos = (state: GameState): GameState =>
  atRight(state)
    ? state
    : {
        ...state,
        piece: {
          ...state.piece,
          pos: { ...state.piece.pos, x: state.piece.pos.x + 1 }
        }
      };

export const decrementXPos = (state: GameState): GameState =>
  atLeft(state)
    ? state
    : {
        ...state,
        piece: {
          ...state.piece,
          pos: { ...state.piece.pos, x: state.piece.pos.x - 1 }
        }
      };
