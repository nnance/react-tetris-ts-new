import { gameReducer } from "./GameReducer";
import { GameState } from "./types";
import { startReducer } from "./StartState";
import { runningReducer } from "./RunningState";
import { startGame, resumeGame, pauseGame } from "./actions";
import { initialState, gameFieldState } from "./transforms";
import { pausedReducer } from "./PausedState";

describe("when starting a new game", () => {
  const state: GameState = {
    nextCycle: startReducer,
    ...initialState(),
    ...gameFieldState()
  };
  it("should transition to running state", () => {
    expect(gameReducer(state, startGame()).nextCycle).toEqual(runningReducer);
  });
});

describe("when game is running", () => {
  const state: GameState = {
    nextCycle: runningReducer,
    ...initialState(),
    ...gameFieldState()
  };
  it("should transition to paused when pause game", () => {
    expect(gameReducer(state, pauseGame()).nextCycle).toEqual(pausedReducer);
  });
});

describe("when game is paused", () => {
  const state: GameState = {
    nextCycle: pausedReducer,
    ...initialState(),
    ...gameFieldState()
  };
  it("should transition to running when resumed", () => {
    expect(gameReducer(state, resumeGame()).nextCycle).toEqual(runningReducer);
  });
  it("should transition to running on start gam,e", () => {
    expect(gameReducer(state, startGame()).nextCycle).toEqual(runningReducer);
  });
});
