import React from "react";
import GameStore from "../state/GameStore";
import { GameActionTypes } from "../state/game/types";
import {
  moveRight,
  moveLeft,
  moveDown,
  rotatePiece
} from "../state/game/actions";

enum KeyCode {
  spaceBar = 32,
  leftArrow = 37,
  upArrow = 38,
  rightArrow = 39,
  downArrow = 40
}

const handler = (dispatch: React.Dispatch<GameActionTypes>) => ({
  keyCode
}: KeyboardEvent): void => {
  if (keyCode === KeyCode.rightArrow) dispatch(moveRight());
  else if (keyCode === KeyCode.leftArrow) dispatch(moveLeft());
  else if (keyCode === KeyCode.upArrow) dispatch(rotatePiece());
  else if (keyCode === KeyCode.downArrow) dispatch(moveDown());
};

const useGameControls = (): void => {
  const [, dispatch] = React.useContext(GameStore);
  const downHandler = handler(dispatch);

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return (): void => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [downHandler]);
};

export default useGameControls;
