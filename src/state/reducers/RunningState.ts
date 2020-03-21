import { GameReducer, GameActions, GameState } from "../../types";
import { pauseTransform } from "./PausedState";
import { restartTransform } from "./StartState";
import { endTurnTransform } from "./EndTurnState";
import {
  collide,
  incrementYPos,
  incrementXPos,
  decrementXPos,
  rotatePiece,
  newPieceTransform
} from "../PieceRules";

export const runningReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame
    ? restartTransform()
    : type === GameActions.moveDown && !collide(state, incrementYPos)
    ? incrementYPos(state)
    : type === GameActions.moveRight && !collide(state, incrementXPos)
    ? incrementXPos(state)
    : type === GameActions.moveLeft && !collide(state, decrementXPos)
    ? decrementXPos(state)
    : type === GameActions.rotatePiece && !collide(state, rotatePiece)
    ? rotatePiece(state)
    : (type === GameActions.moveDown || type === GameActions.gameCycle) &&
      collide(state, incrementYPos)
    ? endTurnTransform(state)
    : type === GameActions.pauseGame
    ? pauseTransform(state)
    : type === GameActions.gameCycle
    ? incrementYPos(state)
    : state;

export const runningTransform = (state: GameState): GameState => ({
  ...state,
  nextCycle: runningReducer
});

export const runningTransformNextPiece = (state: GameState): GameState =>
  newPieceTransform({
    ...state,
    nextCycle: runningReducer
  });
