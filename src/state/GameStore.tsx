import React from "react";
import { pickNewPiece, pieceToBoardPiece, gameActions } from "./GameActions";
import { GameState, GameActions } from "../types";

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

export const GameProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(initialState);
  const actions = gameActions(setState);

  return (
    <GameStore.Provider value={[state, actions]}>{children}</GameStore.Provider>
  );
};

export default GameStore;
