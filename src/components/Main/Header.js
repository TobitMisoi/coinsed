import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function Header() {
  const { loginWithPopup, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const handleLogin = () => {
    loginWithPopup();
    if (isAuthenticated) {
      navigate("/dashboard");
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
                onClick={handleLogin}
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
