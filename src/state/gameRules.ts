import { GameStateSetter } from "./GameStore";
import { BoardPiece, drawBlock, Piece } from "../components/drawing";
import { blocks } from "../components/blocks";
import useInterval from "../hooks/useInterval";

export const pieceToBoardPiece = (piece: Piece): BoardPiece => ({
  pos: { x: 1, y: 0 },
  piece,
  isAtBottom: false,
  drawer: piece[0]
});

export const pickNewPiece = (): Piece => {
  const pieceIndex = Math.floor(Math.random() * blocks.length);
  return blocks[pieceIndex];
};

export const incrementScore = (setState: GameStateSetter) => (
  value: number
): void => setState(state => ({ ...state, score: state.score + value }));

export const moveDown = (setState: GameStateSetter) => ({
  pos,
  drawer
}: BoardPiece): void => {
  setState(state => ({
    ...state,
    piece: {
      ...state.piece,
      pos: { ...state.piece.pos, y: state.piece.pos.y + 1 }
    },
    lines: drawBlock(pos.x, pos.y + 1, drawer)
  }));
};

export const startGame = (setState: GameStateSetter) => (): void => {
  setState(state => ({
    ...state,
    lines: drawBlock(state.piece.pos.x, state.piece.pos.y, state.piece.drawer)
  }));
  const movePiece = moveDown(setState);
  useInterval(() => {
    setState(state => {
      movePiece(state.piece);
      return state;
    });
  }, 500);
};
