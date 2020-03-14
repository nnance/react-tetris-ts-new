import { GameReducer, GameActions, GameState } from "./types";
import { pausedReducer } from "./PausedState";
import { startTransform } from "./StartState";
import {
  BoardPiece,
  DrawableAction,
  drawBlock,
  BlockState
} from "../../components/drawing";
import { updateBoard } from "../GameActions";
import { turnOverReducer } from "./TurnOverState";

type BoundaryPredicate = (action: DrawableAction) => boolean;

const drawPiece = (piece: BoardPiece): DrawableAction[] =>
  drawBlock(piece.pos.x, piece.pos.y, piece.drawer);

const checkBoundary = (
  piece: BoardPiece,
  predicate: BoundaryPredicate
): boolean => drawPiece(piece).find(predicate) !== undefined;

const atBottom = (piece: BoardPiece): boolean =>
  checkBoundary(piece, action => action.y >= updateBoard([]).length - 1);

const atLeft = (piece: BoardPiece): boolean =>
  checkBoundary(piece, action => action.x === 0);

const atRight = (piece: BoardPiece): boolean =>
  checkBoundary(piece, action => action.x >= updateBoard([])[0].length - 1);

const didCollide = ({ piece, lines }: GameState): boolean => {
  const newBoard = updateBoard(lines);
  return checkBoundary(
    piece,
    action => newBoard[action.y][action.x] === BlockState.on
  );
};

const incrementYPos = (state: GameState): GameState => {
  const newState = {
    ...state,
    piece: {
      ...state.piece,
      pos: { ...state.piece.pos, y: state.piece.pos.y + 1 }
    }
  };
  const newTransition = { ...state, nextCycle: turnOverReducer };
  return atBottom(state.piece) || didCollide(newState)
    ? newTransition
    : newState;
};

const incrementXPos = (state: GameState): GameState => {
  const newState = {
    ...state,
    piece: {
      ...state.piece,
      pos: { ...state.piece.pos, x: state.piece.pos.x + 1 }
    }
  };

  return atRight(state.piece) || didCollide(newState) ? state : newState;
};

const decrementXPos = (state: GameState): GameState => {
  const newState = {
    ...state,
    piece: {
      ...state.piece,
      pos: { ...state.piece.pos, x: state.piece.pos.x - 1 }
    }
  };

  return atLeft(state.piece) || didCollide(newState) ? state : newState;
};

export const runningTransform = (state: GameState): GameState => ({
  ...state,
  nextCycle: runningReducer
});

export const runningReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame
    ? startTransform()
    : type === GameActions.moveDown
    ? incrementYPos(state)
    : type === GameActions.moveRight
    ? incrementXPos(state)
    : type === GameActions.moveLeft
    ? decrementXPos(state)
    : type === GameActions.pauseGame
    ? { ...state, nextCycle: pausedReducer }
    : state;
