import { GameState, GameActionTypes } from "../../types";
import { pieceToBoardPiece, startTransform } from "./StartState";
import { OBlock } from "../../components/blocks";
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

export const startState: GameState = {
  ...startTransform(),
  nextCycle: runningReducer,
  piece: pieceToBoardPiece(OBlock),
  next: OBlock,
  level: 10
};
