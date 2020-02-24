import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./containers/App";

export default function Router(): React.ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </BrowserRouter>
  );
}
