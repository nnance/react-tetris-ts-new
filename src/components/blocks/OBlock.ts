import {
  BlockState,
  DrawableAction,
  Piece,
  BlockColor,
  DrawableState
} from "../drawing";

const color = BlockColor.yellow;

const verticalBlock = (
  x: number,
  y: number,
  blockState: BlockState
): DrawableAction[] => {
  const state: DrawableState = [blockState, color];
  return [
    { x, y, state },
    { x, y: y + 1, state },
    { x: x + 1, y, state },
    { x: x + 1, y: y + 1, state }
  ];
};

export const drawers: Piece = [verticalBlock];
