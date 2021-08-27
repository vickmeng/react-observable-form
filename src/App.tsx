import { Route, Switch, useLocation } from "react-router-dom";
import React from "react";

import "./App.less";

import Home from "./pages/home";
import QuickStart from "./pages/quickStart";
import Menu from "./components/menu";
import Core from "./pages/core";
import FieldPage from "./pages/basic/field";
import GroupPage from "./pages/basic/group";

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

          <Route path="/field" component={FieldPage} />
          <Route path="/group" component={GroupPage} />
          {/* <Route path="/list" component={FieldPage} /> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
