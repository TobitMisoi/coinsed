import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

function Header() {
  return (
    <header>
      <Box>
        <AppBar position='sticky' sx={{ background: "#000100" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Toolbar>
              <Typography>Coinsed</Typography>
            </Toolbar>
            <Toolbar>links</Toolbar>
          </Box>
        </AppBar>
      </Box>
    </header>
  );
}

export default Header;
