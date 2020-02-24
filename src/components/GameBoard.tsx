import React from "react";
import Header, { HeaderProps } from "./Header";
import StatusSection from "./StatusSection";
import NextPiece from "./NextPiece";
import { Piece } from "./drawing";
import PlayField from "./PlayField";

type GameBoardProps = {
  theme: React.CSSProperties;
  piece: Piece;
} & HeaderProps;

export default function GameBoard(props: GameBoardProps): React.ReactElement {
  const style: React.CSSProperties = {
    ...props.theme,
    ...{
      textAlign: "center",
      height: "100%"
    }
  };

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
        <PlayField />
        <NextPiece piece={props.piece} />
      </div>
    </div>
  );
}
