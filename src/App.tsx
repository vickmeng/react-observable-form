import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import "./App.css";
import Basic from "./pages/basic";
import GroupDemo from "./pages/group";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/basic">basic</Link>
              </li>
              <li>
                <Link to="/groupDemo">groupDemo</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/basic">
              <Basic />
            </Route>
            <Route path="/groupDemo">
              <GroupDemo />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
