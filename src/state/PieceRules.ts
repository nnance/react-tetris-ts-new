import { BoardPiece, Piece, GameReducer } from "../types";
import { blocks } from "../components/blocks";

export type GameBoardPiece = {
  piece: BoardPiece;
  shadowPiece: BoardPiece;
  next: Piece;
};

const pieceToBoardPiece = (piece: Piece): BoardPiece => ({
  pos: { x: 1, y: 0 },
  piece,
  drawer: piece[0]
});

const pickNewPiece = (): Piece => {
  const pieceIndex = Math.floor(Math.random() * blocks.length);
  return blocks[pieceIndex];
};

export const initialPieceState = (newPiece?: Piece): GameBoardPiece => {
  const piece = pieceToBoardPiece(newPiece || pickNewPiece());
  return { piece, shadowPiece: piece, next: pickNewPiece() };
};

export const newPieceTransform = (state: GameBoardPiece): GameBoardPiece => {
  const piece = state.next
    ? pieceToBoardPiece(state.next)
    : pieceToBoardPiece(pickNewPiece());

  const next = pickNewPiece();

  return { ...state, piece, shadowPiece: piece, next };
};

export const pieceReducer: GameReducer = (state, action) => ({ ...state });
