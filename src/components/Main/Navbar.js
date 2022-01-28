import { useWeb3 } from "@3rdweb/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const { logout } = useAuth0();
  const { disconnectWallet } = useWeb3();

  const handleLogout = () => {
    logout();
    disconnectWallet();
    return;
  };
  return (
    <div>
      <AppBar
        position='static'
        sx={{
          background: "#000100",
          width: "70%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0 auto",
        }}
      >
        <Toolbar>
          <Typography
            component={Link}
            to='/'
            sx={{
              fontSize: "18px",
              textTransform: "uppercase",
              color: "#f8f8f8",
              textDecoration: "none",
            }}
          >
            Coinsed
          </Typography>
        </Toolbar>
        <Toolbar>
          <Button
            variant='outlined'
            sx={{
              background: "red",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
