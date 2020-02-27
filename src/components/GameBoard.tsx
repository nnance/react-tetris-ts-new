import React from "react";
import Header, { HeaderProps } from "./Header";
import Container from "./Container";
import StatusSection from "./StatusSection";
import NextPiece from "./NextPiece";
import { Piece } from "./drawing";
import PlayField from "./PlayField";
import { GameState } from "../state/GameStore";

type GameBoardProps = {
  theme: React.CSSProperties;
  piece: Piece;
  game: GameState;
} & HeaderProps;

export default function GameBoard(props: GameBoardProps): React.ReactElement {
  return (
    <Container theme={props.theme}>
      <Header
        startHandler={props.startHandler}
        pauseHandler={props.pauseHandler}
        resumeHandler={props.resumeHandler}
        isPaused={props.game.paused}
      />
      <div className="row">
        <StatusSection level={props.game.score} lines={props.game.lineCount} />
        <PlayField piece={props.game.piece} />
        <NextPiece piece={props.piece} />
      </div>
    </Container>
  );
}
