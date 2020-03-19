import { GameState, GameActionTypes, Piece } from "../../types";
import { startTransform } from "./StartState";
import { OBlock } from "../../components/blocks";
import { runningReducer } from "./RunningState";
import { initialPieceState } from "../PieceRules";

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

export const startState = (piece?: Piece): GameState => ({
  ...startTransform(),
  ...initialPieceState(piece || OBlock),
  nextCycle: runningReducer,
  level: 10
});
