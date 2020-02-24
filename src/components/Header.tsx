import React from "react";
import Title from "./Title";

export type HeaderProps = {
  startHandler: () => void;
  pauseHandler: () => void;
  resumeHandler: () => void;
  isPaused: boolean;
};

const Header: React.FC<HeaderProps> = props => (
  <Title>
    <button className="btn btn-primary" onClick={props.startHandler}>
      New Game
    </button>
    <button
      className="btn btn-primary ml-2"
      onClick={props.isPaused ? props.resumeHandler : props.pauseHandler}
    >
      {props.isPaused ? `Resume ` : `Pause`}
    </button>
    <div className="d-none d-md-block">
      <br />
    </div>
  </Title>
);

export default Header;
