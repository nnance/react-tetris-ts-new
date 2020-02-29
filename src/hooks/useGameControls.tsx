import React from "react";
import GameStore from "../state/GameStore";
import useKeyPress, { KeyCode } from "./useKeyPress";

const useGameControls = (): void => {
  const [, { moveRight }] = React.useContext(GameStore);
  const rightArrow = useKeyPress({ keyCode: KeyCode.rightArrow });

  React.useEffect(() => {
    rightArrow && moveRight();
  }, [rightArrow, moveRight]);
};

export default useGameControls;
