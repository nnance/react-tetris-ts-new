import {
  BoardPiece,
  Piece,
  DrawableAction,
  GameState,
  DrawableGrid,
  BlockState,
  BlockDrawer,
  GameTransform
} from "../types";
import { blocks } from "../components/blocks";
import { drawBlock } from "../components/drawing";

export type GameBoardPiece = {
  piece: BoardPiece;
  shadowPiece: BoardPiece;
  next: Piece;
};

type BoundaryPredicate = (action: DrawableAction) => boolean;
type StateTransform = (state: GameState) => GameState;

const drawPiece = (piece: BoardPiece): DrawableAction[] =>
  drawBlock(piece.pos.x, piece.pos.y, piece.drawer);

const checkBoundary = (
  piece: BoardPiece,
  predicate: BoundaryPredicate
): boolean => drawPiece(piece).find(predicate) !== undefined;

const atBottom = (action: DrawableAction, grid: DrawableGrid): boolean =>
  action.y >= grid.length;

const atLeft = (action: DrawableAction): boolean => action.x < 0;

const atRight = (action: DrawableAction, grid: DrawableGrid): boolean =>
  action.x >= grid[0].length;

const hitLine = (action: DrawableAction, grid: DrawableGrid): boolean =>
  grid[action.y][action.x] === BlockState.on;

const getNewDrawer = (boarPiece: BoardPiece): BlockDrawer => {
  const idx = boarPiece.piece.findIndex(drawer => drawer === boarPiece.drawer);
  return boarPiece.piece[idx === boarPiece.piece.length - 1 ? 0 : idx + 1];
};

const pieceToBoardPiece = (piece: Piece): BoardPiece => ({
  pos: { x: 1, y: 0 },
  piece,
  drawer: piece[0]
});

const pickNewPiece = (): Piece => {
  const pieceIndex = Math.floor(Math.random() * blocks.length);
  return blocks[pieceIndex];
};

export const collide = (
  state: GameState,
  transform: StateTransform
): boolean => {
  const { lines, piece, board } = transform(state);
  const grid = board(lines);
  return checkBoundary(
    piece,
    action =>
      atLeft(action) ||
      atRight(action, grid) ||
      atBottom(action, grid) ||
      hitLine(action, grid)
  );
};

const addShadowPiece = (state: GameState): GameState => {
  const movements = Array(state.board([]).length).fill(incrementYPos);

  const reducer = (cur: GameState, move: GameTransform): GameState =>
    collide(cur, move) ? cur : move(cur);

  const newState = movements.reduce(reducer, state);

  return { ...state, shadowPiece: { ...newState.piece } };
};

export const withShadowPiece = (transform: GameTransform) => (
  state: GameState
): GameState => addShadowPiece(transform(state));

export const incrementYPos: GameTransform = (state): GameState => ({
  ...state,
  piece: {
    ...state.piece,
    pos: { ...state.piece.pos, y: state.piece.pos.y + 1 }
  }
});

export const incrementXPos = (state: GameState): GameState => ({
  ...state,
  piece: {
    ...state.piece,
    pos: { ...state.piece.pos, x: state.piece.pos.x + 1 }
  }
});

export const decrementXPos = (state: GameState): GameState => ({
  ...state,
  piece: {
    ...state.piece,
    pos: { ...state.piece.pos, x: state.piece.pos.x - 1 }
  }
});

export const rotatePiece = (state: GameState): GameState => ({
  ...state,
  piece: { ...state.piece, drawer: getNewDrawer(state.piece) }
});

export const initialPieceState = (newPiece?: Piece): GameBoardPiece => {
  const piece = pieceToBoardPiece(newPiece || pickNewPiece());
  return { piece, shadowPiece: piece, next: pickNewPiece() };
};

export const newPieceTransform = (state: GameState): GameState => {
  const piece = state.next
    ? pieceToBoardPiece(state.next)
    : pieceToBoardPiece(pickNewPiece());

  const next = pickNewPiece();

  return addShadowPiece({ ...state, piece, next });
};
