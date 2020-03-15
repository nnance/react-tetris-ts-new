import {
  GameReducer,
  GameActions,
  GameState,
  CompletedState
} from "../../types";
import {
  DrawableAction,
  BlockState,
  drawBlock
} from "../../components/drawing";
import { GameRules, basicRules } from "../GameRules";
import { runningTransformNextPiece } from "./RunningState";
import { restartTransform } from "./StartState";

const eraseLines = (
  fullRows: number[],
  actions: DrawableAction[]
): DrawableAction[] => {
  const removeLines = (
    prev: DrawableAction[],
    action: DrawableAction
  ): DrawableAction[] =>
    fullRows.find(row => row === action.y) ? prev : prev.concat(action);

  const calculateDrop = (action: DrawableAction): DrawableAction =>
    fullRows.reduce(
      (prev, row) => (prev.y < row ? { ...prev, y: prev.y + 1 } : prev),
      { ...action }
    );

  const emptyBoard = [] as DrawableAction[];

  return actions.reduce(removeLines, emptyBoard).map(calculateDrop);
};

const decrementTetrisCycle = (state: CompletedState): CompletedState => ({
  ...state,
  completed: { ...state.completed, cycleCount: state.completed.cycleCount - 1 }
});

const endTetrisCycle = (rules: GameRules, state: CompletedState): GameState => {
  const newScore = rules(state.completed.lines.length, {
    lineCount: state.lineCount,
    level: state.level,
    score: state.score,
    gravity: state.gravity
  });

  return runningTransformNextPiece({
    ...state,
    ...newScore,
    lines: eraseLines(state.completed.lines, state.lines)
  });
};

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

export const completedLineReducer: GameReducer = (state, { type }) => {
  const completedState = state as CompletedState;
  return type === GameActions.startGame
    ? restartTransform()
    : type === GameActions.gameCycle && completedState.completed.cycleCount > 0
    ? decrementTetrisCycle(completedState)
    : endTetrisCycle(basicRules, completedState);
};

export const completedLineTransform = (
  state: GameState,
  fullRows: number[]
): GameState => {
  const { piece } = state;
  const actions = drawBlock(piece.pos.x, piece.pos.y, piece.drawer);
  const lines = state.lines.concat(actions);

  return {
    ...state,
    lines: highlightLines(fullRows, lines),
    completed: {
      lines: fullRows,
      cycleCount: 1
    },
    nextCycle: completedLineReducer
  };
};
