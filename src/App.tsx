import { Route, Switch, useLocation } from "react-router-dom";
import React from "react";

import "./App.less";

import Home from "./pages/home";
import QuickStart from "./pages/quickStart";
import Menu from "./components/menu";
import Core from "./pages/core";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <Menu />}

      <div className="content">
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/quick-start" component={QuickStart} />
          <Route path="/core" component={Core} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
