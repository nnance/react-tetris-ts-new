import { GameStateSetter, GameActions, GameState } from "../types";
import {
  BoardPiece,
  Piece,
  drawBlock,
  drawBoard,
  BlockDrawer,
  DrawableAction,
  BlockState
} from "../components/drawing";
import { blocks } from "../components/blocks";

export const updateBoard = drawBoard(20, 10);

const atBottom = (piece: BoardPiece): boolean => {
  const actions = drawBlock(piece.pos.x, piece.pos.y, piece.drawer);
  return (
    actions.find(action => action.y >= updateBoard([]).length - 1) !== undefined
  );
};

const atLeft = (piece: BoardPiece): boolean => {
  const actions = drawBlock(piece.pos.x, piece.pos.y, piece.drawer);
  return actions.find(action => action.x === 0) !== undefined;
};

const atRight = (piece: BoardPiece): boolean => {
  const board = updateBoard([]);
  const actions = drawBlock(piece.pos.x, piece.pos.y, piece.drawer);
  return actions.find(action => action.x >= board[0].length - 1) !== undefined;
};

const didCollide = (actions: DrawableAction[], game: GameState): boolean => {
  const newBoard = updateBoard(game.lines);
  const collisions = actions.find(
    action => newBoard[action.y][action.x] === BlockState.on
  );
  return collisions !== undefined;
};

export const pieceToBoardPiece = (piece: Piece): BoardPiece => ({
  pos: { x: 1, y: 0 },
  piece,
  isAtBottom: false,
  drawer: piece[0]
});

const drawPiece = (state: GameState): DrawableAction[] => {
  return drawBlock(state.piece.pos.x, state.piece.pos.y, state.piece.drawer);
};

export const pickNewPiece = (): Piece => {
  const pieceIndex = Math.floor(Math.random() * blocks.length);
  return blocks[pieceIndex];
};

const incrementScore = (setState: GameStateSetter) => (value: number): void =>
  setState(state => ({ ...state, score: state.score + value }));

const getNewDrawer = (boarPiece: BoardPiece): BlockDrawer => {
  const idx = boarPiece.piece.findIndex(drawer => drawer === boarPiece.drawer);
  return boarPiece.piece[idx === boarPiece.piece.length - 1 ? 0 : idx + 1];
};

const rotationBlocked = (piece: BoardPiece): boolean => {
  const drawer = getNewDrawer(piece);
  const board = updateBoard([]);
  const actions = drawBlock(piece.pos.x, piece.pos.y, drawer);
  return actions.find(action => action.x >= board[0].length) !== undefined;
};

const rotatePiece = (setState: GameStateSetter) => (): void => {
  setState(state =>
    !rotationBlocked(state.piece)
      ? {
          ...state,
          piece: { ...state.piece, drawer: getNewDrawer(state.piece) }
        }
      : state
  );
};

const endPieceMovement = (state: GameState): GameState => ({
  ...state,
  piece: pieceToBoardPiece(state.next),
  next: pickNewPiece(),
  lines: state.lines.concat(
    drawBlock(state.piece.pos.x, state.piece.pos.y, state.piece.drawer)
  )
});

const moveDown = (setState: GameStateSetter) => (): void => {
  setState(state => {
    const newState = {
      ...state,
      piece: {
        ...state.piece,
        pos: { ...state.piece.pos, y: state.piece.pos.y + 1 }
      }
    };

    return atBottom(state.piece) || didCollide(drawPiece(newState), state)
      ? endPieceMovement(state)
      : !state.paused
      ? newState
      : state;
  });
};

const startGame = (setState: GameStateSetter) => (): void => {
  setState(state => ({
    ...state,
    paused: false,
    started: true
  }));
  setInterval(moveDown(setState), 500);
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
  setState(state => {
    const newState = {
      ...state,
      piece: {
        ...state.piece,
        pos: { ...state.piece.pos, x: state.piece.pos.x + 1 }
      }
    };

    return atRight(state.piece) || didCollide(drawPiece(newState), state)
      ? state
      : newState;
  });

const moveLeft = (setState: GameStateSetter) => (): void =>
  setState(state => {
    const newState = {
      ...state,
      piece: {
        ...state.piece,
        pos: { ...state.piece.pos, x: state.piece.pos.x - 1 }
      }
    };

    return atLeft(state.piece) || didCollide(drawPiece(newState), state)
      ? state
      : newState;
  });

export const gameActions = (setState: GameStateSetter): GameActions => ({
  incrementScore: incrementScore(setState),
  startGame: startGame(setState),
  pauseGame: pauseGame(setState),
  resumeGame: resumeGame(setState),
  moveDown: moveDown(setState),
  moveRight: moveRight(setState),
  moveLeft: moveLeft(setState),
  rotatePiece: rotatePiece(setState)
});
