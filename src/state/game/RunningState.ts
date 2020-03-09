import { GameReducer, GameActions } from "./types";
import {
  startTransform,
  incrementYPos,
  incrementXPos,
  decrementXPos
} from "./transforms";

export const runningReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame
    ? startTransform(state)
    : type === GameActions.moveDown
    ? incrementYPos(state)
    : type === GameActions.moveRight
    ? incrementXPos(state)
    : type === GameActions.moveLeft
    ? decrementXPos(state)
    : state;
