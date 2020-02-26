import React from "react";
import ThemeStore from "../state/ThemeStore";
import GameStore, { GameProvider } from "../state/GameStore";
import { drawers } from "../components/blocks/JBlock";
import GameBoard from "../components/GameBoard";

export default function GameBoardContainer(): React.ReactElement {
  const handler = (): void => undefined;
  const [theme] = React.useContext(ThemeStore);

  return (
    <GameProvider>
      <GameStore.Consumer>
        {([game, actions]): React.ReactElement => (
          <GameBoard
            theme={theme}
            startHandler={(): void => actions.incrimentScore(1)}
            pauseHandler={handler}
            resumeHandler={handler}
            isPaused={true}
            piece={drawers}
            game={game}
          />
        )}
      </GameStore.Consumer>
    </GameProvider>
  );
}
