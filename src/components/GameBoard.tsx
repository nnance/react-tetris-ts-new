import React from "react";
import Header, { HeaderProps } from "./Header";
import StatusSection from "./StatusSection";
import NextPiece from "./NextPiece";
import { Piece, drawBoard, BlockState } from "./drawing";
import PlayField, { PlayFieldProps } from "./PlayField";

type GameBoardProps = {
  theme: React.CSSProperties;
  piece: Piece;
} & HeaderProps &
  PlayFieldProps;

const updateBoard = drawBoard(5, 5);

export default function GameBoard(props: GameBoardProps): React.ReactElement {
  const style: React.CSSProperties = {
    ...props.theme,
    ...{
      textAlign: "center",
      height: "100%"
    }
  };

  const drawer = props.piece[0];
  const state = updateBoard(drawer(1, 0, BlockState.on));

  return (
    <div style={style} className="container-fluid">
      <Header
        startHandler={props.startHandler}
        pauseHandler={props.pauseHandler}
        resumeHandler={props.resumeHandler}
        isPaused={props.isPaused}
      />
      <div className="row">
        <StatusSection level={1} lines={0} />
        <PlayField board={props.board} />
        <NextPiece grid={state} />
      </div>
    </div>
  );
}
