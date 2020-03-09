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
  gravity: 500
});

export const startTransform = ({ nextCycle }: GameState): GameState => ({
  nextCycle,
  ...initialState(),
  ...gameFieldState()
});

export const incrementYPos = (state: GameState): GameState => ({
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
