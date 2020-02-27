import React from "react";
import ThemeStore from "../state/ThemeStore";
import GameStore, { GameProvider } from "../state/GameStore";
import { drawers } from "../components/blocks/JBlock";
import Container from "../components/Container";
import Header from "../components/Header";
import StatusSection from "../components/StatusSection";
import PlayField from "../components/PlayField";
import NextPiece from "../components/NextPiece";
import useFPS from "../hooks/useFPS";

export default function GameBoardContainer(): React.ReactElement {
  const [theme] = React.useContext(ThemeStore);
  const fps = useFPS();

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
              <StatusSection fps={fps} level={game.score} lines={game.lineCount} />
              <PlayField piece={game.piece} />
              <NextPiece piece={drawers} />
            </div>
          </Container>
        )}
      </GameStore.Consumer>
    </GameProvider>
  );
}
