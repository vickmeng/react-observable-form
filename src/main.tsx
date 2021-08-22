import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core";
import ReactDOM from "react-dom";

import "./index.css";

import App from "./App";

const theme = createTheme({
  // palette: {
  //   type: "dark",
  // },
  palette: { primary: { main: "#FE6B8B" } },
  typography: {
    h2: { color: "coral" },
    body1: {
      fontWeight: 100,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
