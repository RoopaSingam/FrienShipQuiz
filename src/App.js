import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import QuizMain from "./QuizMain";

import history from "./History";

export default function App(props) {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/QuizMain" component={QuizMain} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}
