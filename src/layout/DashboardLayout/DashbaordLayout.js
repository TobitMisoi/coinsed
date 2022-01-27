import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Main/Sidebar";

function DashbaordLayout({ children }) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        {children || <Outlet />}
      </Box>
    </>
  );
}

export default DashbaordLayout;
