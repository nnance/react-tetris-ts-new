import React from "react";
import PieceViewer from "../components/PieceViewer";
import useTheme from "../hooks/useTheme";

const PieceViewerContainer: React.FC = () => {
  const theme = useTheme();

  return <PieceViewer theme={theme} />;
};

export default PieceViewerContainer;
