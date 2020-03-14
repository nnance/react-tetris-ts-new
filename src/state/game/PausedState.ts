import { GameReducer, GameActions, GameState } from "./types";
import { runningTransform } from "./RunningState";
import { startTransform } from "./StartState";

export const pausedReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame
    ? startTransform()
    : type === GameActions.resumeGame
    ? runningTransform(state)
    : state;

export const pauseTransform = (state: GameState): GameState => ({
  ...state,
  nextCycle: pauseTransform
});
