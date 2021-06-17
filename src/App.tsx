import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import "./App.css";
import Basic from "./pages/basic";
import GroupDemo from "./pages/group";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <div className="row">
            <nav className="col-3">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/basic">basic</Link>
                </li>
                <li className="nav-item">
                  <Link to="/groupDemo">groupDemo</Link>
                </li>
              </ul>
            </nav>
            <div className="col">
              <Switch>
                <Route path="/basic">
                  <Basic />
                </Route>
                <Route path="/groupDemo">
                  <GroupDemo />
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
