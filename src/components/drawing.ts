export enum BlockColor {
  cyan = "cyan",
  blue = "blue",
  orange = "orange",
  yellow = "yellow",
  green = "green",
  purple = "purple",
  red = "red",
  white = "white",
  grew = "grey",
  random = "random"
}

export enum BlockState {
  off,
  on,
  shaded,
  highlight
}

export type DrawableState = [BlockState, BlockColor];

export type DrawableAction = {
  x: number;
  y: number;
  state: DrawableState;
};

export type BlockDrawer = (
  x: number,
  y: number,
  state: BlockState
) => DrawableAction[];

export type Piece = BlockDrawer[];

export type DrawableGrid = DrawableState[][];

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

export const drawBoard = (height: number, width: number) => (
  actions: DrawableAction[]
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
