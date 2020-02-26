import { GameStateSetter } from "./GameStore";
import { BoardPiece, DrawableAction, drawBlock } from "../components/drawing";

export const incrimentScore = (setState: GameStateSetter) => (
  value: number
): void => setState(state => ({ ...state, score: state.score + value }));

export const moveDown = (setState: GameStateSetter) => ({
  pos,
  drawer
}: BoardPiece): DrawableAction[] => {
  setState(state => ({ ...state, pos: { ...state.pos, y: state.pos.y } }));
  return drawBlock(pos.x, pos.y + 1, drawer);
};

export const startGame = (setState: GameStateSetter) => () => {
  setInterval(() => moveDown(game), 500);
};
