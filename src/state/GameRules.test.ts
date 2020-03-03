import { basicRules } from "./GameRules";

describe("with the basic rules", () => {
  const { calculateScore } = basicRules();

  it("should calculate the new score based on completed lines", () => {
    expect(calculateScore(1, 1)).toEqual(100);
  });

  it("should multiply score by level", () => {
    expect(calculateScore(2, 3)).toEqual(900);
  });
});
