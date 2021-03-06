import { BlockState, DrawableAction, Piece } from "../drawing";

const verticalBlock = (
  x: number,
  y: number,
  state: BlockState
): DrawableAction[] => [
  { x, y, state },
  { x, y: y + 1, state },
  { x: x + 1, y, state },
  { x: x + 1, y: y + 1, state }
];

export const drawers: Piece = [verticalBlock];
