import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const routes = [
  {
    path: "",
    element: (
      <>
        Main layout <Outlet />
      </>
    ),
    children: [
      { path: "", element: <Navigate to={`/home`} replace /> },
      {
        path: "home",
        element: <>Home</>,
      },
      {
        path: "about",
        element: <>About page</>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <>
        Sidebar
        <Outlet />
      </>
    ),
    children: [
      { path: "", element: <Navigate to='/dashboard/account' replace /> },
      {
        path: "account",
        element: <>Dashboard </>,
      },
      { path: "transactions", element: <>Transaction</> },
    ],
  },
  {
    path: "*",
    element: <>Page not found!</>,
  },
];

export default routes;
