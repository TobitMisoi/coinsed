import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";

function Header(props) {
  const { loginWithPopup, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  console.log(props);

  const history = createBrowserHistory();
  const handleLogin = () => {
    loginWithPopup();
    if (isAuthenticated) {
      navigate("/dashboard");
    }
    history.push("/dashboard");
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
                {isAuthenticated ? "GO TO DASHBOARD" : "LOGIN"}
              </Button>
            </Toolbar>
          </Box>
        </AppBar>
      </Box>
    </header>
  );
}

export default Header;
