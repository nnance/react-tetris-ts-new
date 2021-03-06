import React from "react";
import { BoardPiece, Piece, DrawableAction } from "../components/drawing";

export type GameState = {
  piece: BoardPiece;
  next: Piece;
  score: number;
  lineCount: number;
  level: number;
  paused: boolean;
  started: boolean;
  tetrisLines: number[];
  tetrisCycle: number;
  lines: DrawableAction[];
  gravity: number;
};

export type GameActions = {
  incrementScore: (value: number) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  startGame: () => void;
  moveDown: () => void;
  moveRight: () => void;
  moveLeft: () => void;
  rotatePiece: () => void;
};

export type GameStateSetter = React.Dispatch<React.SetStateAction<GameState>>;
