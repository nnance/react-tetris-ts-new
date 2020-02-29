import React from "react";
import GameStore, { GameProvider } from "../state/GameStore";
import { drawers } from "../components/blocks/JBlock";
import Container from "../components/Container";
import Header from "../components/Header";
import StatusSection from "./StatusSection";
import PlayField from "../components/PlayField";
import NextPiece from "../components/NextPiece";
import useTheme from "../hooks/useTheme";

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
              <StatusSection />
              <PlayField piece={game.piece} started={game.started} />
              <NextPiece piece={drawers} />
            </div>
          </Container>
        )}
      </GameStore.Consumer>
    </GameProvider>
  );
}
