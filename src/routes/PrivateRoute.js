import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? children : <Navigate to='/' />;
}

export default PrivateRoute;
