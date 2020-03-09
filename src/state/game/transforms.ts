import { ScoreState, GameState, GameFieldState } from "./types";
import { pickNewPiece, pieceToBoardPiece } from "../GameActions";

export const initialState = (): ScoreState => ({
  score: 0,
  level: 1,
  lineCount: 0
});

export const gameFieldState = (): GameFieldState => ({
  piece: pieceToBoardPiece(pickNewPiece()),
  next: pickNewPiece(),
  lines: [],
  gravity: 0
});

export const startTransform = ({ nextCycle }: GameState): GameState => ({
  nextCycle,
  ...initialState(),
  ...gameFieldState()
});
