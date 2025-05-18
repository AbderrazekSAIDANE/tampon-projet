import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes";
import App from "./App.tsx";
import "./index.css"; // <-- importer Tailwind ici

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
