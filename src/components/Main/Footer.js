import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <footer>
      <AppBar position='fixed' sx={{ bottom: 0, top: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Toolbar>Footer Section</Toolbar>
          <Toolbar>short links</Toolbar>
        </Box>
        <Typography sx={{ textAlign: "center" }}>
          Made with ❤️ by <a href='https://tobitmisoi.com'>tobitmisoi</a>
        </Typography>
      </AppBar>
    </footer>
  );
}

export default Footer;
