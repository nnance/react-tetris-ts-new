import { GameState, GameActionTypes } from "../../types";
import { pieceToBoardPiece, startTransform } from "./StartState";
import { OBlock } from "../../components/blocks";
import { moveLeft, moveRight, moveDown, gameCycle } from "../actions";
import { runningReducer } from "./RunningState";

const moveTimes = (count: number, movement: () => GameActionTypes) => (
  state: GameState
): GameState => {
  return Array(count)
    .fill(movement)
    .reduce((prev, cur) => state.nextCycle(prev, cur()), state);
};

type ReducerTrigger = (
  state: GameState,
  movement: () => GameActionTypes,
  count?: number
) => GameState;

export const triggerReducer: ReducerTrigger = (state, movement, count = 1) =>
  moveTimes(count, movement)(state);

export const moveLeft6Times = moveTimes(6, moveLeft);
export const moveRight12Times = moveTimes(12, moveRight);
export const moveDown25Times = moveTimes(25, moveDown);
export const gameCycle25Times = moveTimes(25, gameCycle);

export const startState: GameState = {
  ...startTransform(),
  nextCycle: runningReducer,
  piece: pieceToBoardPiece(OBlock),
  next: OBlock,
  level: 10
};
