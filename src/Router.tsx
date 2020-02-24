import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./containers/App";
import GameBoard from "./containers/GameBoard";
import PieceViewer from "./containers/PieceViewer";

export default function Router(): React.ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/game" component={GameBoard} />
        <Route exact path="/piece" component={PieceViewer} />
      </Switch>
    </BrowserRouter>
  );
}
