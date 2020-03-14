import { GameReducer, GameActions, GameState } from "./types";
import { pauseTransform } from "./PausedState";
import { startTransform } from "./StartState";
import {
  BoardPiece,
  DrawableAction,
  drawBlock,
  BlockState
} from "../../components/drawing";
import { updateBoard } from "../GameActions";
import { endTurnTransform } from "./EndTurnState";

// TODO: implement piece rotation

type BoundaryPredicate = (action: DrawableAction) => boolean;
type StateTransform = (state: GameState) => GameState;

const emptyBoard = updateBoard([]);

const drawPiece = (piece: BoardPiece): DrawableAction[] =>
  drawBlock(piece.pos.x, piece.pos.y, piece.drawer);

const checkBoundary = (
  piece: BoardPiece,
  predicate: BoundaryPredicate
): boolean => drawPiece(piece).find(predicate) !== undefined;

const atBottom = (action: DrawableAction): boolean =>
  action.y >= emptyBoard.length;

const atLeft = (action: DrawableAction): boolean => action.x < 0;

const atRight = (action: DrawableAction): boolean =>
  action.x >= emptyBoard[0].length;

const hitLine = (action: DrawableAction, lines: DrawableAction[]): boolean => {
  const newBoard = updateBoard(lines);
  return newBoard[action.y][action.x] === BlockState.on;
};

const collide = (state: GameState, transform: StateTransform): boolean => {
  const { lines, piece } = transform(state);
  return checkBoundary(
    piece,
    action =>
      atLeft(action) ||
      atRight(action) ||
      atBottom(action) ||
      hitLine(action, lines)
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

export const runningReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame
    ? startTransform()
    : type === GameActions.moveDown && !collide(state, incrementYPos)
    ? incrementYPos(state)
    : type === GameActions.moveRight && !collide(state, incrementXPos)
    ? incrementXPos(state)
    : type === GameActions.moveLeft && !collide(state, decrementXPos)
    ? decrementXPos(state)
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
