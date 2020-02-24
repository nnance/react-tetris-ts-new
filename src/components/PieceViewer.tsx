import React from "react";
import Title from "./Title";

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
    </div>
  );
};

export default PieceViewer;
