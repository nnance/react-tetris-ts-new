import React from "react";
import "./animation.css";
import { BlockState, BoardPiece, DrawableAction, BoardDrawer } from "../types";
import { drawBlock } from "./drawing";

type PlayFieldProps = {
  started: boolean;
  piece: BoardPiece;
  shadowPiece: BoardPiece;
  boardLines: DrawableAction[];
  board: BoardDrawer;
};

type CellStyle = { style: React.CSSProperties; testID: string };

const Block = {
  width: "20px",
  height: "20px",
  border: "1px solid black",
  fontSize: "0.75rem"
};

export const PieceBlock = {
  ...Block,
  backgroundColor: "blue"
};

export const ShadedBlock = {
  ...Block,
  backgroundColor: "grey"
};

export const EmptyBlock = {
  ...Block,
  backgroundColor: "white"
};

const getStyle = (block: BlockState): CellStyle =>
  block === BlockState.on
    ? { style: PieceBlock, testID: "on" }
    : block === BlockState.highlight
    ? {
        style: { ...Block, animation: "blinking .25s infinite" },
        testID: "highlight"
      }
    : block === BlockState.shaded
    ? { style: ShadedBlock, testID: "shaded" }
    : { style: EmptyBlock, testID: "empty" };

const PlayField: React.FC<PlayFieldProps> = ({
  piece,
  shadowPiece,
  started,
  boardLines,
  board
}) => {
  const { pos, drawer } = shadowPiece;
  const shadowBoard = drawBlock(pos.x, pos.y, drawer, BlockState.shaded);
  const boardPiece = drawBlock(piece.pos.x, piece.pos.y, piece.drawer);

  const lines = !started ? [] : boardLines.concat(shadowBoard, boardPiece);
  const grid = board(lines);

  return (
    <div className="col-md-4 col-8">
      <table style={{ margin: "0px auto" }}>
        <tbody>
          {grid.map((row, rowIdx) => (
            <tr key={`${row}-${rowIdx}`}>
              {row.map((block, idx) => (
                <td
                  key={idx}
                  style={getStyle(block).style}
                  data-testid={getStyle(block).testID}
                >
                  {" "}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayField;
