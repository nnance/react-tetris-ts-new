import React from "react";
import Title from "./Title";
import NextPiece from "./NextPiece";
import { drawers } from "./blocks/SBlock";

type PieceViewerProps = {
  theme: React.CSSProperties;
};

const PieceViewer: React.FC<PieceViewerProps> = props => {
  const style: React.CSSProperties = {
    ...props.theme,
    ...{
      textAlign: "center",
      height: "100%"
    }
  };

  return (
    <div style={style} className="container-fluid">
      <Title />
      <div className="row">
        <NextPiece piece={drawers} />
      </div>
    </div>
  );
};

export default PieceViewer;
