import { GameActionTypes, GameActions } from "./types";

export const startGame = (): GameActionTypes => ({
  type: GameActions.startGame
});

export const pauseGame = (): GameActionTypes => ({
  type: GameActions.pauseGame
});

export const resumeGame = (): GameActionTypes => ({
  type: GameActions.resumeGame
});
