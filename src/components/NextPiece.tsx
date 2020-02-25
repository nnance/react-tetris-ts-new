import React from "react";
import { Piece } from "./drawing";
import PieceGrid from "./PieceGrid";

type NextPieceProps = { piece: Piece };

const NextPiece: React.FC<NextPieceProps> = props => {
  return (
    <div className="col-md-4 col-4" style={{ textAlign: "left" }}>
      <div className="d-none d-md-block">
        <b>Next Piece</b>
        <br />
      </div>
      <br />
      <PieceGrid drawer={props.piece[0]} />
    </div>
  );
};

export default NextPiece;
