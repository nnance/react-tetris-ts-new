import { GameActions, GameReducer, GameState } from "./types";
import { runningReducer } from "./RunningState";
import { ScoreState, GameFieldState } from "./types";
import { pickNewPiece, pieceToBoardPiece } from "../GameActions";
import { drawBoard } from "../../components/drawing";

export const initialState = (): ScoreState => ({
  score: 0,
  level: 1,
  lineCount: 0
});

export const gameFieldState = (): GameFieldState => ({
  piece: pieceToBoardPiece(pickNewPiece()),
  next: pickNewPiece(),
  board: drawBoard(20, 10),
  lines: [],
  gravity: 500
});

export const startTransform = (): GameState => ({
  ...initialState(),
  ...gameFieldState(),
  nextCycle: runningReducer
});

export const startReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame ? startTransform() : state;
