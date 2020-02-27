import React from "react";
import Container from "./Container";
import Title from "./Title";
import PieceGrid from "./PieceGrid";
import {
  IBlock,
  JBlock,
  LBlock,
  OBlock,
  SBlock,
  TBlock,
  ZBlock
} from "./blocks";
import { Piece } from "./drawing";

type PieceViewerProps = {
  theme: React.CSSProperties;
};

type BlockTuple = [string, Piece];

const blocks: BlockTuple[] = [
  ["IBlock", IBlock],
  ["JBlock", JBlock],
  ["LBlock", LBlock],
  ["OBlock", OBlock],
  ["SBlock", SBlock],
  ["TBlock", TBlock],
  ["ZBlock", ZBlock]
];

const PieceViewer: React.FC<PieceViewerProps> = ({ theme }) => {
  return (
    <Container theme={theme}>
      <Title />
      <table>
        <tbody>
          {blocks.map(([name, drawers], idx) => (
            <tr key={idx}>
              <td style={{ width: "100px", textAlign: "left" }}>{name}</td>
              {drawers.map((drawer, idx) => (
                <td key={idx}>
                  <PieceGrid drawer={drawer} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default PieceViewer;
