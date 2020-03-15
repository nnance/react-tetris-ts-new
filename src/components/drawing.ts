export enum BlockState {
  off,
  on,
  shaded,
  highlight
}

export type DrawableAction = {
  x: number;
  y: number;
  state: BlockState;
};

export type BlockDrawer = (
  x: number,
  y: number,
  state: BlockState
) => DrawableAction[];

export type Piece = BlockDrawer[];

export type DrawableGrid = BlockState[][];

export type Pos = {
  x: number;
  y: number;
};

export type BoardPiece = {
  pos: Pos;
  piece: Piece;
  drawer: BlockDrawer;
  isAtBottom: boolean;
  actions?: DrawableAction[];
};

export const drawBlock = (
  x: number,
  y: number,
  drawer: BlockDrawer
): DrawableAction[] => {
  return drawer(x, y, BlockState.on);
};

export type BoardDrawer = (actions: DrawableAction[]) => DrawableGrid;

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
