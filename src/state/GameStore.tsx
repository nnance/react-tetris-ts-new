import React from "react";

type GameState = {
  score: number;
  lines: number;
};

const initialState: GameState = {
  score: 0,
  lines: 1
};

type GameActions = {
  incrimentScore: (value: number) => void
};

type GameStore = [GameState, GameActions];

const GameStore = React.createContext<GameStore>([
  initialState,
  {} as GameActions
]);

const gameActions = (
  setState: React.Dispatch<React.SetStateAction<GameState>>
): GameActions => ({
  incrimentScore: value => setState(state => ({...state, score: state.score + value}))
});

export const GameProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(initialState);
  const actions = gameActions(setState);

  return (
    <GameStore.Provider value={[state, actions]}>
      {children}
    </GameStore.Provider>
  );
};

export default ThemeStore;
