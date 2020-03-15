import React from "react";
import GameStore, { GameProvider } from "../state/GameStore";
import Container from "../components/Container";
import Header from "../components/Header";
import StatusSection from "../components/StatusSection";
import PlayField from "../components/PlayField";
import NextPiece from "../components/NextPiece";
import useTheme from "../hooks/useTheme";
import useGameControls from "../hooks/useGameControls";
import useFPS from "../hooks/useFPS";
import { startGame, pauseGame, resumeGame } from "../state/actions";
import { pausedReducer } from "../state/reducers/PausedState";
import { startReducer } from "../state/reducers/StartState";

const PlayFieldContainer: React.FC = () => {
  const [game] = React.useContext(GameStore);
  useGameControls();
  return (
    <PlayField
      piece={game.piece}
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
  const theme = useTheme();

  return (
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
  );
}
