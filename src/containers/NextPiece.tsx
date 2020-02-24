import React from "react";
import NextPiece from "../components/NextPiece";
import { Piece, BlockState, drawBoard } from "../components/drawing";

const updateBoard = drawBoard(5, 5);

const NextPieceContainer: React.FC<{ piece: Piece }> = ({ piece }) => {
  const drawer = piece[0];
  const state = updateBoard(drawer(1, 0, BlockState.on));
  return <NextPiece grid={state} />;
};

export default NextPieceContainer;
