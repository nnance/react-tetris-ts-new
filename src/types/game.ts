import React from "react";
import { BoardPiece, Piece } from "../components/drawing";

export type GameState = {
  piece: BoardPiece;
  next: Piece;
  score: number;
  lineCount: number;
  level: number;
  paused: boolean;
  started: boolean;
};

export type GameActions = {
  incrementScore: (value: number) => void;
  moveDown: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  startGame: () => void;
};

export type GameStateSetter = React.Dispatch<React.SetStateAction<GameState>>;
