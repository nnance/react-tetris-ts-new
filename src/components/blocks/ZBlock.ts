import {
  BlockState,
  DrawableAction,
  Piece,
  BlockColor,
  DrawableState
} from "../drawing";

const color = BlockColor.red;

const verticalBlock = (
  x: number,
  y: number,
  blockState: BlockState
): DrawableAction[] => {
  const state: DrawableState = [blockState, color];
  return [
    { x: x + 1, y, state },
    { x: x + 1, y: y + 1, state },
    { x, y: y + 1, state },
    { x, y: y + 2, state }
  ];
};

const horizontalBlock = (
  x: number,
  y: number,
  blockState: BlockState
): DrawableAction[] => {
  const state: DrawableState = [blockState, color];
  return [
    { x, y, state },
    { x: x + 1, y, state },
    { x: x + 1, y: y + 1, state },
    { x: x + 2, y: y + 1, state }
  ];
};

export const drawers: Piece = [verticalBlock, horizontalBlock];
