import { GameState } from "./types";
import { runningReducer } from "./RunningState";
import { startGame, moveDown, moveRight, moveLeft } from "./actions";
import { initialState, gameFieldState } from "./transforms";

describe("when game is running", () => {
  const state: GameState = {
    nextCycle: runningReducer,
    ...initialState(),
    ...gameFieldState(),
    level: 10
  };
  it("should reset game on start game", () => {
    expect(runningReducer(state, startGame()).level).toEqual(1);
  });
  describe("when down action", () => {
    it("should move the active piece", () => {
      expect(runningReducer(state, moveDown()).piece.pos.y).toEqual(1);
    });
  });
  describe("when right action", () => {
    it("should move the active piece right", () => {
      expect(runningReducer(state, moveRight()).piece.pos.x).toEqual(2);
    });
  });
  describe("when left action", () => {
    it("should move the active piece left", () => {
      expect(runningReducer(state, moveLeft()).piece.pos.x).toEqual(0);
    });
  });
});
