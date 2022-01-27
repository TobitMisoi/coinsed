import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import axios from "axios";

function Header() {
  const accessCoinbase = async () => {
    let resp;
    try {
      resp = await axios.get(
        `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&state=SECURE_RANDOM&scope=wallet:accounts:read`
      );
    } catch (error) {
      console.log(error);
    }

    if (resp.config.url) {
      window.location.href = resp.config.url;
    }
  };

  return (
    <header>
      <Box>
        <AppBar position='fixed' sx={{ background: "#000100", height: "78px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Toolbar>
              <Typography>Coinsed</Typography>
            </Toolbar>
            <Toolbar>
              <Button
                variant='contained'
                color='primary'
                disableRipple
                onClick={accessCoinbase}
              >
                LOGIN
              </Button>
            </Toolbar>
          </Box>
        </AppBar>
      </Box>
    </header>
  );
}

export default Header;
