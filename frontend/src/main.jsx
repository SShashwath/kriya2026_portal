import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GameProvider } from "./context/GameContext.jsx";
import AssetPreloader from "./components/AssetPreloader.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AssetPreloader>
      <GameProvider>
        <App />
      </GameProvider>
    </AssetPreloader>
  </StrictMode>
);