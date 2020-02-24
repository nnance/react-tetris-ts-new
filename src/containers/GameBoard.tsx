import React from "react";
import ThemeStore from "../state/ThemeStore";
import { drawers } from "../components/blocks/JBlock";
import GameBoard from "../components/GameBoard";

export default function GameBoardContainer(): React.ReactElement {
  const handler = (): void => undefined;
  const [theme] = React.useContext(ThemeStore);

  return (
    <GameBoard
      theme={theme}
      startHandler={handler}
      pauseHandler={handler}
      resumeHandler={handler}
      isPaused={true}
      piece={drawers}
    />
  );
}
