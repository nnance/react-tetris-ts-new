import { GameReducer, GameActions, GameState } from "../../types";
import { runningTransform } from "./RunningState";
import { restartTransform } from "./StartState";

export const pausedReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame
    ? restartTransform()
    : type === GameActions.resumeGame
    ? runningTransform(state)
    : state;

export const pauseTransform = (state: GameState): GameState => ({
  ...state,
  nextCycle: pausedReducer
});
