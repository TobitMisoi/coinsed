import { CssBaseline } from "@mui/material";
import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const content = useRoutes(routes);

  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  getParameterByName("id");

  console.log(getParameterByName("code"));

  return (
    <>
      <CssBaseline />
      {content}
    </>
  );
}

export default App;
