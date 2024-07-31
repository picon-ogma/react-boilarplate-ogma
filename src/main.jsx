import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './utilities/env';
import { App } from "./App";

const root = document.getElementById("root");

if (!root) {
  throw new Error(
    "No root element found. Check [your-project-name/index.html] and add the entry node."
  );
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
