import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { DashboardProvider } from "./contexts/DashboardContext.jsx";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DashboardProvider>
      <App />
      <Analytics />
    </DashboardProvider>
  </StrictMode>
);
