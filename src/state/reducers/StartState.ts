import {
  GameActions,
  GameReducer,
  GameState,
  ScoreState,
  GameFieldState
} from "../../types";
import { drawBoard } from "../../components/drawing";
import { runningTransform } from "./RunningState";
import { initialPieceState } from "../PieceRules";
import { basicRules } from "../GameRules";

const initialState = (): ScoreState => ({
  score: 0,
  level: 1,
  lineCount: 0
});

const gameFieldState = (): GameFieldState => {
  return {
    ...initialPieceState(),
    board: drawBoard(20, 10),
    lines: [],
    gravity: 500
  };
};

export const startTransform = (): GameState => {
  const state = {
    ...initialState(),
    ...initialPieceState(),
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
