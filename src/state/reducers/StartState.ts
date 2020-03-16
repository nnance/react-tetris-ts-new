import {
  GameActions,
  GameReducer,
  GameState,
  ScoreState,
  GameFieldState,
  Piece,
  BoardPiece
} from "../../types";
import { drawBoard } from "../../components/drawing";
import { blocks } from "../../components/blocks";
import { runningTransform } from "./RunningState";

const initialState = (): ScoreState => ({
  score: 0,
  level: 1,
  lineCount: 0
});

const gameFieldState = (): GameFieldState => ({
  piece: pieceToBoardPiece(pickNewPiece()),
  next: pickNewPiece(),
  board: drawBoard(20, 10),
  lines: [],
  gravity: 500
});

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

export const startTransform = (): GameState => ({
  ...initialState(),
  ...gameFieldState(),
  nextCycle: startReducer
});

export const restartTransform = (): GameState =>
  runningTransform(startTransform());

export const startReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame ? runningTransform(state) : state;
