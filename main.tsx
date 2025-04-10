import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./mui/theme.ts";
import { UserContextProvider } from "./context/userContext.tsx";
import { user } from "./data/data.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContextProvider userData={user}>
        <App />
      </UserContextProvider>
    </ThemeProvider>
  </StrictMode>
);
