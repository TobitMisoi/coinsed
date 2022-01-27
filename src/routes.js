import React from "react";
import { Navigate } from "react-router-dom";
import { HomeLayout, DashboardLayout } from "./layout";
import { Account } from "./pages";
import { Home as HomePage } from "./views";

const routes = [
  {
    path: "",
    element: <HomeLayout />,
    children: [
      { path: "", element: <Navigate to={`/home`} replace /> },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <>About page</>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <Navigate to='/dashboard/account' replace /> },
      {
        path: "account",
        element: <Account />,
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
