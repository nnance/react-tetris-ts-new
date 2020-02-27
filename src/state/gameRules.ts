import { GameStateSetter } from "./GameStore";
import { BoardPiece, Piece } from "../components/drawing";
import { blocks } from "../components/blocks";

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

export const moveDown = (setState: GameStateSetter) => (): void => {
  setState(state => ({
    ...state,
    piece: {
      ...state.piece,
      pos: { ...state.piece.pos, y: state.piece.pos.y + 1 }
    }
  }));
};

export const startGame = (setState: GameStateSetter) => (): void => {
  setState(state => ({
    ...state,
    paused: false
  }));
  setInterval(
    () =>
      setState(state => {
        if (!state.paused) moveDown(setState)();
        return state;
      }),
    500
  );
};

export const pauseGame = (setState: GameStateSetter) => (): void =>
  setState(state => ({
    ...state,
    paused: true
  }));

export const resumeGame = (setState: GameStateSetter) => (): void =>
  setState(state => ({
    ...state,
    paused: false
  }));
