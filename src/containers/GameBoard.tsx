import React from "react";
import ThemeStore from "../state/ThemeStore";
import { drawers } from "../components/blocks/JBlock";
import { drawBoard } from "../components/drawing";
import GameBoard from "../components/GameBoard";

const updateBoard = drawBoard(20, 10);

export default function GameBoardContainer(): React.ReactElement {
  const handler = (): void => undefined;
  const [theme] = React.useContext(ThemeStore);
  const [state] = React.useState(updateBoard([]));

  return (
    <GameBoard
      theme={theme}
      startHandler={handler}
      pauseHandler={handler}
      resumeHandler={handler}
      isPaused={true}
      piece={drawers}
      board={state}
    />
  );
}
