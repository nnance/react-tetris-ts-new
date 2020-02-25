import React from "react";
import Header, { HeaderProps } from "./Header";
import Container from "./Container";
import StatusSection from "./StatusSection";
import NextPiece from "./NextPiece";
import { Piece } from "./drawing";
import PlayField from "./PlayField";

type GameBoardProps = {
  theme: React.CSSProperties;
  piece: Piece;
} & HeaderProps;

export default function GameBoard(props: GameBoardProps): React.ReactElement {
  return (
    <Container theme={props.theme}>
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
    </Container>
  );
}
