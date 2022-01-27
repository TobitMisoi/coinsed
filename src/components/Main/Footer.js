import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <footer>
      <AppBar position='relative' sx={{ bottom: 0, background: "#000100" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Toolbar>Footer Section</Toolbar>
          <Toolbar>short links</Toolbar>
        </Box>
        <Typography sx={{ textAlign: "center", color: "#f8f8f8" }}>
          Made with ❤️ by{" "}
          <a style={{ color: "#f8f8f8" }} href='https://tobitmisoi.com'>
            tobitmisoi
          </a>
        </Typography>
      </AppBar>
    </footer>
  );
}

export default Footer;
