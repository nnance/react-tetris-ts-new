import {
  GameReducer,
  GameState,
  GameActions,
  DrawableAction
} from "../../types";
import { drawBlock } from "../../components/drawing";
import { runningTransformNextPiece } from "./RunningState";
import { completedLineTransform } from "./CompletedLineState";

const findFullRows = (actions: DrawableAction[]): number[] =>
  actions
    .reduce((prev, cur) => {
      prev[cur.y] += 1;
      return prev;
    }, Array(20).fill(0))
    .reduce(
      (prev, row, index) => (row === 10 ? prev.concat([index]) : prev),
      [] as number[]
    );

export const endTurnTransform = (state: GameState): GameState => {
  const { piece } = state;
  const actions = drawBlock(piece.pos.x, piece.pos.y, piece.drawer);
  const lines = state.lines.concat(actions);

  const fullRows = findFullRows(lines);
  return fullRows.length > 0
    ? completedLineTransform(state, fullRows)
    : runningTransformNextPiece({
        ...state,
        lines
      });
};

export const endTurnReducer: GameReducer = (state, { type }) =>
  type === GameActions.gameCycle ? endTurnTransform(state) : state;
