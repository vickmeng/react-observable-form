import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import "./App.css";
import Basic from "./pages/basic";
import GroupDemo from "./pages/group";
import NestedGroupDemo from "./pages/nestedGroup";
import ValidatorsDemo from "./pages/validators";
import DisabledDemo from "./pages/disabledDemo";
import DirtyDemo from "./pages/dirtyDemo";
import GroupDynamicControlDemo from "./pages/groupDynamicControlDemo";
import UseAntd from "./pages/useAntd";
import ListDemo from "./pages/listDemo";
import ListAddAndRemoveItemDemo from "./pages/listAddAndRemoveItemDemo";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <div className="row">
            <nav className="col-3">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/Basic">Basic</Link>
                </li>
                <li className="nav-item">
                  <Link to="/GroupDemo">GroupDemo</Link>
                </li>
                <li className="nav-item">
                  <Link to="/NestedGroupDemo">NestedGroupDemo</Link>
                </li>
                <li className="nav-item">
                  <Link to="/ValidatorsDemo">ValidatorsDemo</Link>
                </li>
                <li className="nav-item">
                  <Link to="/DisabledDemo">DisabledDemo</Link>
                </li>
                <li className="nav-item">
                  <Link to="/DirtyDemo">DirtyDemo</Link>
                </li>

                <li className="nav-item">
                  <Link to="/GroupDynamicControlDemo">GroupDynamicControlDemo</Link>
                </li>

                <li className="nav-item">
                  <Link to="/UseAntd">UseAntd</Link>
                </li>

                <li className="nav-item">
                  <Link to="/ListDemo">ListDemo</Link>
                </li>
                <li className="nav-item">
                  <Link to="/ListAddAndRemoveItemDemo">ListAddAndRemoveItemDemo</Link>
                </li>
              </ul>
            </nav>

            <div className="col">
              <Switch>
                <Route path="/Basic">
                  <Basic />
                </Route>
                <Route path="/GroupDemo">
                  <GroupDemo />
                </Route>
                <Route path="/NestedGroupDemo">
                  <NestedGroupDemo />
                </Route>
                <Route path="/ValidatorsDemo">
                  <ValidatorsDemo />
                </Route>
                <Route path="/DisabledDemo">
                  <DisabledDemo />
                </Route>
                <Route path="/DirtyDemo">
                  <DirtyDemo />
                </Route>
                <Route path="/GroupDynamicControlDemo">
                  <GroupDynamicControlDemo />
                </Route>
                <Route path="/UseAntd">
                  <UseAntd />
                </Route>
                <Route path="/ListDemo">
                  <ListDemo />
                </Route>
                <Route path="/ListAddAndRemoveItemDemo">
                  <ListAddAndRemoveItemDemo />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
