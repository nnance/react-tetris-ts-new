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
};

export type BoardDrawer = (actions: DrawableAction[]) => DrawableGrid;
