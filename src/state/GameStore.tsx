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
import { BoardPiece, Piece } from "../components/drawing";

export type GameState = {
  piece: BoardPiece;
  next: Piece;
  score: number;
  lineCount: number;
  level: number;
  paused: boolean;
};

const initialState: GameState = {
  piece: pieceToBoardPiece(pickNewPiece()),
  next: pickNewPiece(),
  score: 0,
  lineCount: 0,
  level: 1,
  paused: true,
};

type GameActions = {
  incrementScore: (value: number) => void;
  moveDown: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  startGame: () => void;
};

type GameStore = [GameState, GameActions];

export type GameStateSetter = React.Dispatch<React.SetStateAction<GameState>>;

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
