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
  startGame: (): void => setState(startGame),
  incrementScore: (value): void => setState(incrementScore(value)),
  pauseGame: (): void => setState(pauseGame),
  resumeGame: (): void => setState(resumeGame),
  moveDown: (): void => setState(moveDown),
  moveRight: (): void => setState(moveRight),
  moveLeft: (): void => setState(moveLeft),
  rotatePiece: (): void => setState(rotatePiece)
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
