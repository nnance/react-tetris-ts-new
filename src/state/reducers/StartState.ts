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
import { basicRules } from "../GameRules";

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
  drawer: piece[0]
});

export const pickNewPiece = (): Piece => {
  const pieceIndex = Math.floor(Math.random() * blocks.length);
  return blocks[pieceIndex];
};

export const startTransform = (): GameState => {
  const state = {
    ...initialState(),
    ...gameFieldState(),
    nextCycle: startReducer
  };

  const newScore = basicRules(0, {
    lineCount: state.lineCount,
    level: state.level,
    score: state.score,
    gravity: state.gravity
  });

  return {
    ...state,
    ...newScore
  };
};

export const restartTransform = (): GameState =>
  runningTransform(startTransform());

export const startReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame ? runningTransform(state) : state;
