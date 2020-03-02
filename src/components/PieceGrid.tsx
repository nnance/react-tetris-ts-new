import React from "react";
import { drawBoard, BlockState, BlockDrawer } from "./drawing";

type PieceGridProps = { drawer: BlockDrawer };

const Block = {
  width: "20px",
  height: "20px",
  border: "1px solid black",
  fontSize: "0.75rem"
};

const EmptyBlock = {
  ...Block,
  backgroundColor: "white"
};

const updateBoard = drawBoard(5, 5);

const PieceGrid: React.FC<PieceGridProps> = props => {
  const state = updateBoard(props.drawer(1, 0, BlockState.on));

  return (
    <table>
      <tbody>
        {state.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((col, idx) => (
              <td
                key={`${rowIdx}, ${idx}`}
                style={
                  col[0] ? { ...Block, backgroundColor: col[1] } : EmptyBlock
                }
              >
                {" "}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PieceGrid;
