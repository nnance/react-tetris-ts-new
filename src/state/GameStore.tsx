import React from "react";
import {
  incrementScore,
  startGame,
  moveDown,
  pauseGame,
  pickNewPiece,
  pieceToBoardPiece,
  resumeGame
} from "./gameRules";
import { GameState, GameActions, GameStateSetter } from "../types";

const initialState: GameState = {
  piece: pieceToBoardPiece(pickNewPiece()),
  next: pickNewPiece(),
  score: 0,
  lineCount: 0,
  level: 1,
  paused: true,
  started: false
};

type GameStore = [GameState, GameActions];

const GameStore = React.createContext<GameStore>([
  initialState,
  {} as GameActions
]);

const gameActions = (setState: GameStateSetter): GameActions => ({
  incrementScore: incrementScore(setState),
  startGame: startGame(setState),
  pauseGame: pauseGame(setState),
  resumeGame: resumeGame(setState),
  moveDown: moveDown(setState)
});

export const GameProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(initialState);
  const actions = gameActions(setState);

  return (
    <GameStore.Provider value={[state, actions]}>{children}</GameStore.Provider>
  );
};

export default GameStore;
