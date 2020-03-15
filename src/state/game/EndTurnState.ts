import { GameReducer, GameState, GameActions } from "./types";
import {
  DrawableAction,
  drawBlock,
  BlockState
} from "../../components/drawing";
import { pieceToBoardPiece, pickNewPiece } from "../GameActions";
import { runningTransform } from "./RunningState";

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

const highlightLines = (
  fullRows: number[],
  actions: DrawableAction[]
): DrawableAction[] =>
  actions.reduce((prev, action) => {
    const newAction = fullRows.reduce(
      (prev, row) =>
        prev.y === row ? { ...prev, state: BlockState.highlight } : prev,
      { ...action }
    );
    return prev.concat(newAction);
  }, [] as DrawableAction[]);

const endPieceMovement = (state: GameState): GameState => {
  const { piece } = state;
  const actions = drawBlock(piece.pos.x, piece.pos.y, piece.drawer);
  const lines = state.lines.concat(actions);

  const fullRows = findFullRows(lines);
  return fullRows.length > 0
    ? {
        ...state,
        lines: highlightLines(fullRows, lines)
        // tetrisLines: fullRows
      }
    : runningTransform({
        ...state,
        piece: pieceToBoardPiece(state.next),
        next: pickNewPiece(),
        lines
      });
};

export const endTurnReducer: GameReducer = (state, { type }) =>
  type === GameActions.gameCycle ? endPieceMovement(state) : state;

export const endTurnTransform = (state: GameState): GameState => ({
  ...state,
  nextCycle: endTurnReducer
});
