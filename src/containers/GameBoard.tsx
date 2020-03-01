import React from "react";
import GameStore, { GameProvider } from "../state/GameStore";
import { drawers } from "../components/blocks/JBlock";
import Container from "../components/Container";
import Header from "../components/Header";
import StatusSection from "../components/StatusSection";
import PlayField from "../components/PlayField";
import NextPiece from "../components/NextPiece";
import useTheme from "../hooks/useTheme";
import useGameControls from "../hooks/useGameControls";
import useFPS from "../hooks/useFPS";

const PlayFieldContainer: React.FC = () => {
  const [game] = React.useContext(GameStore);
  useGameControls();
  return <PlayField piece={game.piece} started={game.started} />;
};

const StatusContainer: React.FC = () => {
  const [game] = React.useContext(GameStore);
  const fps = useFPS();
  return <StatusSection fps={fps} level={game.score} lines={game.lineCount} />;
};

export default function GameBoardContainer(): React.ReactElement {
  const theme = useTheme();

  return (
    <GameProvider>
      <GameStore.Consumer>
        {([game, actions]): React.ReactElement => (
          <Container theme={theme}>
            <Header
              startHandler={actions.startGame}
              pauseHandler={actions.pauseGame}
              resumeHandler={actions.resumeGame}
              isPaused={game.paused}
            />
            <div className="row">
              <StatusContainer />
              <PlayFieldContainer />
              <NextPiece piece={drawers} />
            </div>
          </Container>
        )}
      </GameStore.Consumer>
    </GameProvider>
  );
}
