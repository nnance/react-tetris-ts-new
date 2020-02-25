import React from "react";
import Container from "./Container";
import Title from "./Title";
import PieceGrid from "./PieceGrid";
import { drawers as IBlock } from "./blocks/IBlock";
import { drawers as JBlock } from "./blocks/JBlock";
import { drawers as LBlock } from "./blocks/LBlock";
import { drawers as OBlock } from "./blocks/OBlock";
import { drawers as SBlock } from "./blocks/SBlock";
import { drawers as TBlock } from "./blocks/TBlock";
import { drawers as ZBlock } from "./blocks/ZBlock";
import { Piece } from "./drawing";

type PieceViewerProps = {
  theme: React.CSSProperties;
};

type BlockTupil = [string, Piece];

const blocks: BlockTupil[] = [
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
