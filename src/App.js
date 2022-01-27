import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import theme from "./theme/base";

function App() {
  const content = useRoutes(routes);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {content}
      </ThemeProvider>
    </>
  );
}

export default App;
