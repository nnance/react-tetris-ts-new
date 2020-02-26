import React from "react";

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

const GameStore = React.createContext<GameStore>([
  initialState,
  {} as GameActions
]);

const gameActions = (
  setState: React.Dispatch<React.SetStateAction<GameState>>
): GameActions => ({
  incrimentScore: (value): void =>
    setState(state => ({ ...state, score: state.score + value }))
});

export const GameProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(initialState);
  const actions = gameActions(setState);

  return (
    <GameStore.Provider value={[state, actions]}>{children}</GameStore.Provider>
  );
};

export default GameStore;
