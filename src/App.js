import React from "react";
import { useRoutes, Outlet, Link } from "react-router-dom";
import routes from "./routes";

function App() {
  const content = useRoutes(routes);
  return (
    <>
      {content}
      <Link to={"/dashboard"}>Dashboard</Link>
    </>
  );
}

export default App;
