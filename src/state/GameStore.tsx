import React from "react";
import { incrimentScore } from "./gameRules";

export type GameState = {
  score: number;
  lines: number;
  level: number;
};

const initialState: GameState = {
  score: 0,
  lines: 0,
  level: 1
};

type GameActions = {
  incrimentScore: (value: number) => void;
};

type GameStore = [GameState, GameActions];

export type GameStateSetter = React.Dispatch<React.SetStateAction<GameState>>;

const GameStore = React.createContext<GameStore>([
  initialState,
  {} as GameActions
]);

const gameActions = (setState: GameStateSetter): GameActions => ({
  incrimentScore: incrimentScore(setState)
});

export const GameProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(initialState);
  const actions = gameActions(setState);

  return (
    <GameStore.Provider value={[state, actions]}>{children}</GameStore.Provider>
  );
};

export default GameStore;
