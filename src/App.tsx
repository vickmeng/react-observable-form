import { Route, Switch, useLocation } from "react-router-dom";
import React from "react";

import "./App.less";

import Home from "./pages/home";
import QuickStart from "./pages/quickStart";
import Menu from "./components/menu";
import Core from "./pages/core";
import FieldPage from "./pages/basic/field";
import GroupPage from "./pages/basic/group";
import ListPage from "./pages/basic/list";
import ValidatePage from "./pages/basic/validate";
import DynamicPage from "./pages/advance/dynamic";
import SubscribePage from "./pages/advance/subscribe";
import ResourcesPage from "./pages/resources";
import UniteValidatePage from "./pages/advance/uniteValidate";
import NestPage from "./pages/advance/nest";
import UseRxPage from "./pages/advance/useRx";

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
          <Route path="/list" component={ListPage} />
          <Route path="/validate" component={ValidatePage} />

          <Route path="/subscribe" component={SubscribePage} />
          <Route path="/dynamic" component={DynamicPage} />
          <Route path="/resources" component={ResourcesPage} />
          <Route path="/uniteValidate" component={UniteValidatePage} />
          <Route path="/nest" component={NestPage} />
          <Route path="/useRx" component={UseRxPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
