import { GameReducer, GameActions, GameState } from "../../types";
import { pauseTransform } from "./PausedState";
import {
  pieceToBoardPiece,
  pickNewPiece,
  restartTransform
} from "./StartState";
import {
  BoardPiece,
  DrawableAction,
  drawBlock,
  BlockState,
  BlockDrawer,
  DrawableGrid
} from "../../components/drawing";
import { endTurnTransform } from "./EndTurnState";

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

const collide = (state: GameState, transform: StateTransform): boolean => {
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

const incrementYPos = (state: GameState): GameState => ({
  ...state,
  piece: {
    ...state.piece,
    pos: { ...state.piece.pos, y: state.piece.pos.y + 1 }
  }
});

const incrementXPos = (state: GameState): GameState => ({
  ...state,
  piece: {
    ...state.piece,
    pos: { ...state.piece.pos, x: state.piece.pos.x + 1 }
  }
});

const decrementXPos = (state: GameState): GameState => ({
  ...state,
  piece: {
    ...state.piece,
    pos: { ...state.piece.pos, x: state.piece.pos.x - 1 }
  }
});

const getNewDrawer = (boarPiece: BoardPiece): BlockDrawer => {
  const idx = boarPiece.piece.findIndex(drawer => drawer === boarPiece.drawer);
  return boarPiece.piece[idx === boarPiece.piece.length - 1 ? 0 : idx + 1];
};

const rotatePiece = (state: GameState): GameState => ({
  ...state,
  piece: { ...state.piece, drawer: getNewDrawer(state.piece) }
});

export const runningReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame
    ? restartTransform()
    : type === GameActions.moveDown && !collide(state, incrementYPos)
    ? incrementYPos(state)
    : type === GameActions.moveRight && !collide(state, incrementXPos)
    ? incrementXPos(state)
    : type === GameActions.moveLeft && !collide(state, decrementXPos)
    ? decrementXPos(state)
    : type === GameActions.rotatePiece && !collide(state, rotatePiece)
    ? rotatePiece(state)
    : (type === GameActions.moveDown || type === GameActions.gameCycle) &&
      collide(state, incrementYPos)
    ? endTurnTransform(state)
    : type === GameActions.pauseGame
    ? pauseTransform(state)
    : type === GameActions.gameCycle
    ? incrementYPos(state)
    : state;

export const runningTransform = (state: GameState): GameState => ({
  ...state,
  nextCycle: runningReducer
});

export const runningTransformNextPiece = (state: GameState): GameState => ({
  ...state,
  nextCycle: runningReducer,
  piece: pieceToBoardPiece(state.next),
  next: pickNewPiece()
});
