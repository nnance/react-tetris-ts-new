import {
  BlockDrawer,
  DrawableAction,
  BlockState,
  BoardDrawer,
  DrawableGrid
} from "../types";

export const drawBlock = (
  x: number,
  y: number,
  drawer: BlockDrawer,
  state = BlockState.on
): DrawableAction[] => {
  return drawer(x, y, state);
};

export const drawBoard = (height: number, width: number): BoardDrawer => (
  actions
): DrawableGrid => {
  const grid: DrawableGrid = Array(height)
    .fill(BlockState.off)
    .map(() => Array(width).fill(BlockState.off));

  return actions.reduce((prev, { x, y, state }) => {
    if (x > -1 && y > -1 && y < grid.length && x < grid[y].length) {
      prev[y][x] = state;
    }
    return prev;
  }, grid);
};
