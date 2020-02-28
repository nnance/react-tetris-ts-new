import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Router from "./Router";
import * as serviceWorker from "./serviceWorker";
import ThemeStore, { ThemeProvider } from "./state/ThemeStore";

const Index: React.FC = () => {
  const [theme] = React.useContext(ThemeStore);

  React.useEffect(() => {
    document.body.style.backgroundColor = theme.backgroundColor!;
    document.body.style.color = theme.color!;
  }, [theme]);

  return <Router />;
};

ReactDOM.render(
  <ThemeProvider>
    <Index />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
