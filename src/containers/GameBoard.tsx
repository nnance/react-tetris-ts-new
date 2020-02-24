import React from "react";
import Header from "../components/Header";
import ThemeStore from "../state/ThemeStore";

export default function GameBoard(): React.ReactElement {
  const handler = (): void => undefined;
  const [theme] = React.useContext(ThemeStore);

  const style: React.CSSProperties = {
    ...theme,
    ...{
      textAlign: "center",
      height: "100%"
    }
  };

  return (
    <div style={style}>
      <Header
        startHandler={handler}
        pauseHandler={handler}
        resumeHandler={handler}
        isPaused={true}
      />
    </div>
  );
}
