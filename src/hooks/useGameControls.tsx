import React from "react";
import GameStore from "../state/GameStore";
import { GameActions } from "../types";

enum KeyCode {
  spaceBar = 32,
  leftArrow = 37,
  upArrow = 38,
  rightArrow = 39,
  downArrow = 40
}

const handler = (actions: GameActions) => ({
  keyCode
}: KeyboardEvent): void => {
  if (keyCode === KeyCode.rightArrow) actions.moveRight();
  else if (keyCode === KeyCode.leftArrow) actions.moveLeft();
  else if (keyCode === KeyCode.upArrow) actions.rotatePiece();
};

const useGameControls = (): void => {
  const [, actions] = React.useContext(GameStore);
  const downHandler = handler(actions);

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return (): void => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [downHandler]);
};

export default useGameControls;
