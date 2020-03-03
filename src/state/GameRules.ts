export type GameRules = {
  calculateScore: (lines: number, level: number) => number;
};

const tetrisDSScoring = (lines: number, level: number): number => {
  return lines === 1
    ? 100 * level
    : lines === 2
    ? 300 * level
    : lines === 3
    ? 500 * level
    : lines === 4
    ? 800 * level
    : 0;
};

export const basicRules = (): GameRules => ({
  calculateScore: tetrisDSScoring
});
