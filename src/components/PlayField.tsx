import React from "react";
import { BlockState, drawBoard, BoardPiece, drawBlock } from "./drawing";

type PlayFieldProps = {
  piece: BoardPiece;
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

export const EmptyBlock = {
  ...Block,
  backgroundColor: "white"
};

const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getStyle = (block: BlockState, backgroundColor: string): CellStyle =>
  block === BlockState.on
    ? { style: PieceBlock, testID: "on" }
    : block === BlockState.highlight
    ? {
        style: { ...Block, backgroundColor },
        testID: "highlight"
      }
    : { style: EmptyBlock, testID: "empty" };

const updateBoard = drawBoard(20, 10);

const PlayField: React.FC<PlayFieldProps> = ({ piece }) => {
  const highlight = getRandomColor();
  const lines = drawBlock(piece.pos.x, piece.pos.y, piece.drawer)
  const board = updateBoard(lines);

  return (
    <div className="col-md-4 col-8">
      <table style={{ margin: "0px auto" }}>
        <tbody>
          {board.map((row, rowIdx) => (
            <tr key={`${row}-${rowIdx}`}>
              {row.map((block, idx) => (
                <td
                  key={idx}
                  style={getStyle(block, highlight).style}
                  data-testid={getStyle(block, highlight).testID}
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
