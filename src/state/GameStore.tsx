import React from "react";
import { GameState, GameActionTypes } from "./game/types";
import { basicRules } from "./GameRules";
import useInterval from "../hooks/useInterval";
import { startReducer } from "./game/StartState";
import { gameFieldState, initialState } from "./game/transforms";
import { gameReducer } from "./game/GameReducer";
import { moveDown } from "./game/actions";

type GameStore = [GameState, React.Dispatch<GameActionTypes>];

const initState: GameState = {
  nextCycle: startReducer,
  ...initialState(),
  ...gameFieldState()
};

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
