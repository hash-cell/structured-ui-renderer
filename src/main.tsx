import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { data } from "./mockData";
import ResultView from "./ResultView";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ResultView data={data} />
  </StrictMode>
);