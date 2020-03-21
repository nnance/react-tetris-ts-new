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
  withShadowPiece,
  newPieceTransform
} from "../PieceRules";

const incYWithShadow = withShadowPiece(incrementYPos);
const incXWithShadow = withShadowPiece(incrementXPos);
const decXWithShadow = withShadowPiece(decrementXPos);
const rotateXWithShadow = withShadowPiece(rotatePiece);

export const runningReducer: GameReducer = (state, { type }) =>
  type === GameActions.startGame
    ? restartTransform()
    : type === GameActions.moveDown && !collide(state, incrementYPos)
    ? incYWithShadow(state)
    : type === GameActions.moveRight && !collide(state, incrementXPos)
    ? incXWithShadow(state)
    : type === GameActions.moveLeft && !collide(state, decrementXPos)
    ? decXWithShadow(state)
    : type === GameActions.rotatePiece && !collide(state, rotatePiece)
    ? rotateXWithShadow(state)
    : (type === GameActions.moveDown || type === GameActions.gameCycle) &&
      collide(state, incrementYPos)
    ? endTurnTransform(state)
    : type === GameActions.pauseGame
    ? pauseTransform(state)
    : type === GameActions.gameCycle
    ? incYWithShadow(state)
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
