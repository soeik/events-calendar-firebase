import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { AppProvider } from "./authContext";
import "./i18n";

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
