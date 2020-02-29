import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  RouteComponentProps
} from "react-router-dom";
import ThemedContainer from "./containers/ThemedContainer";
import App from "./containers/App";
import GameBoard from "./containers/GameBoard";
import PieceViewer from "./containers/PieceViewer";

const ThemedApp: React.FC<RouteComponentProps> = props => (
  <ThemedContainer {...props}>
    <App />
  </ThemedContainer>
);

const ThemedGameBoard: React.FC<RouteComponentProps> = props => (
  <ThemedContainer {...props}>
    <GameBoard />
  </ThemedContainer>
);

const withTheme: React.FC<React.ReactElement> = wrapped => {
  return <ThemedContainer {...wrapped.props}>{wrapped}</ThemedContainer>;
};

export default function Router(): React.ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ThemedApp} />
        <Route exact path="/game" component={ThemedGameBoard} />
        <Route exact path="/piece" component={PieceViewer} />
      </Switch>
    </BrowserRouter>
  );
}
