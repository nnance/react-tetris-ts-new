import { GameState, GameActionTypes } from "./types";
import { runningReducer } from "./RunningState";
import { initialState, gameFieldState } from "./StartState";
import { pieceToBoardPiece } from "../GameActions";
import { OBlock } from "../../components/blocks";
import { moveLeft, moveRight, moveDown } from "./actions";

const moveTimes = (count: number, movement: () => GameActionTypes) => (
  state: GameState
): GameState => {
  return Array(count)
    .fill(movement)
    .reduce((prev, cur) => runningReducer(prev, cur()), state);
};

export const moveLeft6Times = moveTimes(6, moveLeft);
export const moveRight12Times = moveTimes(12, moveRight);
export const moveDown25Times = moveTimes(25, moveDown);

export const startState: GameState = {
  nextCycle: runningReducer,
  ...initialState(),
  ...gameFieldState(),
  piece: pieceToBoardPiece(OBlock),
  next: OBlock,
  level: 10
};
