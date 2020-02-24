import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Title: React.FC = ({ children }) => (
  <div id="header">
    <h3>
      Tetris React
      <a href="https://github.com/nbarkhina/TetrisJS">
        <FontAwesomeIcon
          icon={faGithub}
          style={{
            height: "25px",
            paddingBottom: "5px",
            paddingLeft: "10px"
          }}
        />
      </a>
    </h3>
    {children}
    <div className="d-none d-md-block">
      <br />
    </div>
  </div>
);

export default Title;
