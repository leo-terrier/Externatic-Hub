import React from "react";
import ReactDOM from "react-dom/client";

import { ReactNotifications } from "react-notifications-component";
import App from "./App";
import "react-notifications-component/dist/theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <ReactNotifications />
    <App />
  </>
);
