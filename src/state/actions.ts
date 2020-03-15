import { GameActionTypes, GameActions } from "../types";

export const startGame = (): GameActionTypes => ({
  type: GameActions.startGame
});

export const pauseGame = (): GameActionTypes => ({
  type: GameActions.pauseGame
});

export const resumeGame = (): GameActionTypes => ({
  type: GameActions.resumeGame
});

export const moveDown = (): GameActionTypes => ({
  type: GameActions.moveDown
});

export const moveRight = (): GameActionTypes => ({
  type: GameActions.moveRight
});

export const moveLeft = (): GameActionTypes => ({
  type: GameActions.moveLeft
});

export const gameCycle = (): GameActionTypes => ({
  type: GameActions.gameCycle
});

export const rotatePiece = (): GameActionTypes => ({
  type: GameActions.rotatePiece
});
