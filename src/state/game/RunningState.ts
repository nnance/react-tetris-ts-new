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
    : GameActions.moveDown
    ? incrementYPos(state)
    : GameActions.moveRight
    ? incrementXPos(state)
    : GameActions.moveLeft
    ? decrementXPos(state)
    : state;
