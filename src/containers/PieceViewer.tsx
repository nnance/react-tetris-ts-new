import React from "react";
import PieceViewer from "../components/PieceViewer";
import ThemeStore from "../state/ThemeStore";

const PieceViewerContainer: React.FC = () => {
  const [theme] = React.useContext(ThemeStore);

  return <PieceViewer theme={theme} />;
};

export default PieceViewerContainer;
