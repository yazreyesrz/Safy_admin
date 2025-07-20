import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/variables.css";
import "bootstrap/dist/css/bootstrap.min.css"; // ← esto es importante

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
