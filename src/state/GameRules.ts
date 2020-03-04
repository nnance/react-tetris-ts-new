export type ScoreState = {
  level: number;
  lineCount: number;
  score: number;
};

export type GameRules = (lines: number, state: ScoreState) => ScoreState;

const tetrisDSScoring = (lines: number, state: ScoreState): ScoreState => {
  const { level } = state;
  const score =
    lines === 1
      ? 100 * level
      : lines === 2
      ? 300 * level
      : lines === 3
      ? 500 * level
      : lines === 4
      ? 800 * level
      : 0;
  return { ...state, score: state.score + score };
};

const standardLevelUp = (lines: number, state: ScoreState): ScoreState => {
  const { lineCount, level } = state;
  const newLines = lineCount + lines;

  return newLines >= 10
    ? { ...state, lineCount: newLines - 10, level: level + 1 }
    : { ...state, lineCount: newLines };
};

export const basicRules: GameRules = (lines, state): ScoreState =>
  standardLevelUp(lines, tetrisDSScoring(lines, state));
