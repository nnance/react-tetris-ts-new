import { basicRules } from "./GameRules";

describe("with the basic rules", () => {
  it("should calculate the new score based on completed lines", () => {
    const state = { lineCount: 0, level: 1, score: 100, gravity: 0 };
    expect(basicRules(1, state).score).toEqual(200);
  });

  it("should have a gravity of 1 second", () => {
    const state = { lineCount: 0, level: 1, score: 0, gravity: 0 };
    expect(basicRules(1, state).gravity).toEqual(1000);
  });

  it("should level up after 10 lines", () => {
    const state = { lineCount: 8, level: 1, score: 0, gravity: 0 };
    expect(basicRules(2, state).level).toEqual(2);
  });

  it("should leave remainder on line count", () => {
    const state = { lineCount: 9, level: 1, score: 0, gravity: 0 };
    expect(basicRules(2, state).lineCount).toEqual(1);
  });

  describe("when leveling up", () => {
    it("should multiply score by level", () => {
      const state = { lineCount: 0, level: 3, score: 0, gravity: 0 };
      expect(basicRules(2, state).score).toEqual(900);
    });

    it("should calculate gravity by level", () => {
      const state = { lineCount: 0, level: 3, score: 0, gravity: 0 };
      expect(basicRules(2, state).gravity).toEqual(617.796);
    });
  });
});
