import { ScoreState, GameState, GameFieldState } from "./types";
import { pickNewPiece, pieceToBoardPiece, updateBoard } from "../GameActions";
import {
  BoardPiece,
  BlockState,
  DrawableAction,
  drawBlock
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

export const atBottom = (piece: BoardPiece): boolean =>
  checkBoundary(piece, action => action.y >= updateBoard([]).length - 1);

export const atLeft = (piece: BoardPiece): boolean =>
  checkBoundary(piece, action => action.x === 0);

export const atRight = (piece: BoardPiece): boolean =>
  checkBoundary(piece, action => action.x >= updateBoard([])[0].length - 1);

export const didCollide = ({ piece, lines }: GameState): boolean => {
  const newBoard = updateBoard(lines);
  return checkBoundary(
    piece,
    action => newBoard[action.y][action.x] === BlockState.on
  );
};

export const incrementYPos = (state: GameState): GameState => {
  const newState = {
    ...state,
    piece: {
      ...state.piece,
      pos: { ...state.piece.pos, y: state.piece.pos.y + 1 }
    }
  };
  return atBottom(state.piece) || didCollide(newState) ? state : newState;
};

export const incrementXPos = (state: GameState): GameState => {
  const newState = {
    ...state,
    piece: {
      ...state.piece,
      pos: { ...state.piece.pos, x: state.piece.pos.x + 1 }
    }
  };

  return atRight(state.piece) || didCollide(newState) ? state : newState;
};

export const decrementXPos = (state: GameState): GameState => {
  const newState = {
    ...state,
    piece: {
      ...state.piece,
      pos: { ...state.piece.pos, x: state.piece.pos.x - 1 }
    }
  };

  return atLeft(state.piece) || didCollide(newState) ? state : newState;
};
