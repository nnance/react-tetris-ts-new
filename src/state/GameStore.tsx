import React from "react";
import {
  pickNewPiece,
  pieceToBoardPiece,
  startGame,
  gameCycle,
  incrementScore,
  pauseGame,
  resumeGame,
  moveDown,
  moveRight,
  moveLeft,
  rotatePiece
} from "./GameActions";
import { GameState, GameActions, GameStateSetter } from "../types";
import { initialScoreState, basicRules } from "./GameRules";
import useInterval from "../hooks/useInterval";

const initialState: GameState = {
  piece: pieceToBoardPiece(pickNewPiece()),
  next: pickNewPiece(),
  paused: true,
  started: false,
  lines: [],
  tetrisLines: [],
  tetrisCycle: 0,
  ...initialScoreState
};

type GameStore = [GameState, GameActions];

const GameStore = React.createContext<GameStore>([
  initialState,
  {} as GameActions
]);

const gameActions = (setState: GameStateSetter): GameActions => ({
  startGame: (): void => {
    setState(state => startGame(state));
  },
  incrementScore: (value: number): void =>
    setState(state => incrementScore(state, value)),
  pauseGame: (): void => setState(state => pauseGame(state)),
  resumeGame: (): void => setState(state => resumeGame(state)),
  moveDown: (): void => setState(state => moveDown(state)),
  moveRight: (): void => setState(state => moveRight(state)),
  moveLeft: (): void => setState(state => moveLeft(state)),
  rotatePiece: (): void => setState(state => rotatePiece(state))
});

export const GameProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(initialState);
  useInterval(
    () => setState(state => gameCycle(basicRules)(state)),
    state.gravity
  );
  const actions = gameActions(setState);

  return (
    <GameStore.Provider value={[state, actions]}>{children}</GameStore.Provider>
  );
};

export default GameStore;
