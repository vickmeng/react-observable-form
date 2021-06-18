import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import "./App.css";
import Basic from "./pages/basic";
import GroupDemo from "./pages/group";
import NestedGroupDemo from "./pages/nestedGroup";
import ValidatorsDemo from "./pages/validators";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
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
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
