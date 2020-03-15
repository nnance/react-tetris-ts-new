import React from "react";
import { GameState, GameActionTypes } from "../types";
import useInterval from "../hooks/useInterval";
import { gameCycle } from "./actions";
import { startTransform } from "./reducers/StartState";

type GameStore = [GameState, React.Dispatch<GameActionTypes>];

const initState: GameState = startTransform();

const initDispatcher = (): GameState => initState;
const GameStore = React.createContext<GameStore>([initState, initDispatcher]);

export const gameReducer = (
  state: GameState,
  action: GameActionTypes
): GameState => state.nextCycle(state, action);

export const GameProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(gameReducer, initState);
  useInterval(() => dispatch(gameCycle()), state.gravity);

  return (
    <GameStore.Provider value={[state, dispatch]}>
      {children}
    </GameStore.Provider>
  );
};

export default GameStore;
