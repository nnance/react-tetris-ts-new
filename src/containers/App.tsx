import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ThemeStore from "../state/ThemeStore";

const App: React.FC = () => {
  return (
    <ThemeStore.Consumer>
      {([theme]): React.ReactElement => (
        <div className="App">
          <header className="App-header" style={theme}>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      )}
    </ThemeStore.Consumer>
  );
};

export default App;
