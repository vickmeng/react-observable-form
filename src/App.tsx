import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import "./App.css";
import Basic from "./pages/basic";

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
            </ul>
          </nav>

          <Switch>
            <Route path="/basic">
              <Basic />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
