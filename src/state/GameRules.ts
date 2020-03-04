export type ScoreState = {
  level: number;
  lineCount: number;
  score: number;
  gravity: number;
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

const speedCurve = (state: ScoreState): ScoreState => ({
  ...state,
  gravity: Math.pow(0.8 - (state.level - 1) * 0.007, state.level - 1) * 1000
});

export const initialScoreState = speedCurve({
  level: 5,
  lineCount: 9,
  score: 0,
  gravity: 0
});

export const basicRules: GameRules = (lines, state): ScoreState =>
  speedCurve(standardLevelUp(lines, tetrisDSScoring(lines, state)));
