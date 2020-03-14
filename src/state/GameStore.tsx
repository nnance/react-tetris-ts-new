import React from "react";
import { GameState, GameActionTypes } from "./game/types";
import useInterval from "../hooks/useInterval";
import { moveDown } from "./game/actions";
import { startReducer, gameFieldState, initialState } from "./game/StartState";

type GameStore = [GameState, React.Dispatch<GameActionTypes>];

const initState: GameState = {
  nextCycle: startReducer,
  ...initialState(),
  ...gameFieldState()
};

const gameReducer = (state: GameState, action: GameActionTypes): GameState =>
  state.nextCycle(state, action);

const initDispatcher = (action: GameActionTypes): GameState => initState;
const GameStore = React.createContext<GameStore>([initState, initDispatcher]);

export const GameProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(gameReducer, initState);
  useInterval(() => dispatch(moveDown()), state.gravity);

  return (
    <GameStore.Provider value={[state, dispatch]}>
      {children}
    </GameStore.Provider>
  );
};

export default GameStore;
