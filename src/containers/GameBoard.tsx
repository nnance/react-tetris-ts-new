import React from "react";
import GameStore, { GameProvider } from "../state/GameStore";
import Container from "../components/Container";
import Header from "../components/Header";
import StatusSection from "../components/StatusSection";
import PlayField from "../components/PlayField";
import NextPiece from "../components/NextPiece";
import useGameControls from "../hooks/useGameControls";
import useFPS from "../hooks/useFPS";
import { startGame, pauseGame, resumeGame } from "../state/actions";
import { pausedReducer } from "../state/reducers/PausedState";
import { startReducer } from "../state/reducers/StartState";
import ThemeStore from "../state/ThemeStore";

const PlayFieldContainer: React.FC = () => {
  const [game] = React.useContext(GameStore);
  useGameControls();
  return (
    <PlayField
      piece={game.piece}
      shadowPiece={game.shadowPiece}
      started={game.nextCycle !== startReducer}
      boardLines={game.lines}
      board={game.board}
    />
  );
};

const StatusContainer: React.FC = () => {
  const [game] = React.useContext(GameStore);
  const fps = useFPS();
  return (
    <StatusSection
      fps={fps}
      score={game.score}
      level={game.level}
      lines={game.lineCount}
    />
  );
};

export default function GameBoardContainer(): React.ReactElement {
  return (
    <ThemeStore.Consumer>
      {([theme]): React.ReactElement => (
        <GameProvider>
          <GameStore.Consumer>
            {([game, dispatch]): React.ReactElement => (
              <Container theme={theme}>
                <Header
                  startHandler={(): void => dispatch(startGame())}
                  pauseHandler={(): void => dispatch(pauseGame())}
                  resumeHandler={(): void => dispatch(resumeGame())}
                  isPaused={game.nextCycle === pausedReducer}
                />
                <div className="row">
                  <StatusContainer />
                  <PlayFieldContainer />
                  <NextPiece piece={game.next} />
                </div>
              </Container>
            )}
          </GameStore.Consumer>
        </GameProvider>
      )}
    </ThemeStore.Consumer>
  );
}
