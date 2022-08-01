import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { Invoicing } from "./Invoicing";

import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Invoicing />
  </React.StrictMode>
);
