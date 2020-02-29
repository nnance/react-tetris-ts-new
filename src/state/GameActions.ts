import { GameStateSetter, GameActions } from "../types";
import { BoardPiece, Piece, drawBlock, drawBoard } from "../components/drawing";
import { blocks } from "../components/blocks";

export const updateBoard = drawBoard(20, 10);

const atBottom = (piece: BoardPiece): boolean => {
  const actions = drawBlock(piece.pos.x, piece.pos.y, piece.drawer);
  return (
    actions.find(action => action.y >= updateBoard([]).length - 1) !== undefined
  );
};

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

const incrementScore = (setState: GameStateSetter) => (value: number): void =>
  setState(state => ({ ...state, score: state.score + value }));

const moveDown = (setState: GameStateSetter) => (): void => {
  setState(state =>
    atBottom(state.piece)
      ? state
      : {
          ...state,
          piece: {
            ...state.piece,
            pos: { ...state.piece.pos, y: ++state.piece.pos.y }
          }
        }
  );
};

const startGame = (setState: GameStateSetter) => (): void => {
  setState(state => ({
    ...state,
    paused: false,
    started: true
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

const pauseGame = (setState: GameStateSetter) => (): void =>
  setState(state => ({
    ...state,
    paused: true
  }));

const resumeGame = (setState: GameStateSetter) => (): void =>
  setState(state => ({
    ...state,
    paused: false
  }));

const moveRight = (setState: GameStateSetter) => (): void =>
  setState(state => ({
    ...state,
    piece: {
      ...state.piece,
      pos: { ...state.piece.pos, x: ++state.piece.pos.x }
    }
  }));

export const gameActions = (setState: GameStateSetter): GameActions => ({
  incrementScore: incrementScore(setState),
  startGame: startGame(setState),
  pauseGame: pauseGame(setState),
  resumeGame: resumeGame(setState),
  moveDown: moveDown(setState),
  moveRight: moveRight(setState)
});
