import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Main/Navbar";

function DashbaordLayout({ children }) {
  return (
    <>
      <Box sx={{}}>
        <Navbar />
        <br />
        {children || <Outlet />}
      </Box>
    </>
  );
}

export default DashbaordLayout;
