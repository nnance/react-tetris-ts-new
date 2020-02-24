import React from "react";
import { Piece, drawBoard, BlockState } from "./drawing";

type NextPieceProps = { piece: Piece };

const Block = {
  width: "20px",
  height: "20px",
  border: "1px solid black",
  fontSize: "0.75rem"
};

const PieceBlock = {
  ...Block,
  backgroundColor: "blue"
};

const EmptyBlock = {
  ...Block,
  backgroundColor: "white"
};

const updateBoard = drawBoard(5, 5);

const NextPiece: React.FC<NextPieceProps> = props => {
  const drawer = props.piece[0];
  const state = updateBoard(drawer(1, 0, BlockState.on));

  return (
    <div className="col-md-4 col-4" style={{ textAlign: "left" }}>
      <div className="d-none d-md-block">
        <b>Next Piece</b>
        <br />
      </div>
      <br />
      <table>
        <tbody>
          {state.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((col, idx) => (
                <td
                  key={`${rowIdx}, ${idx}`}
                  style={col ? PieceBlock : EmptyBlock}
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

export default NextPiece;
