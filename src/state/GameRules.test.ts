import { basicRules } from "./GameRules";

describe("with the basic rules", () => {
  it("should calculate the new score based on completed lines", () => {
    expect(basicRules(1, { lineCount: 0, level: 1, score: 100 }).score).toEqual(
      200
    );
  });

  it("should multiply score by level", () => {
    expect(basicRules(2, { lineCount: 0, level: 3, score: 0 }).score).toEqual(
      900
    );
  });

  it("should level up after 10 lines", () => {
    expect(basicRules(2, { lineCount: 8, level: 1, score: 0 }).level).toEqual(
      2
    );
  });

  it("should leave remainder on line count", () => {
    expect(
      basicRules(2, { lineCount: 9, level: 1, score: 0 }).lineCount
    ).toEqual(1);
  });
});
