import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useWeb3 } from "@3rdweb/hooks";

const drawerWidth = 240;

function Sidebar() {
  const { logout } = useAuth0();
  const { disconnectWallet } = useWeb3();

  const handleLogout = () => {
    logout();
    disconnectWallet();
    return;
  };

  return (
    <div>
      <Drawer
        sx={{
          mr: 1,
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Typography component={Link} to='/home'>
            Coinsed
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {[{ name: "Overview", path: "account" }].map((text, index) => (
            <ListItem button key={index} component={Link} to={text.path}>
              <ListItemText primary={text.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Button
          variant='outlined'
          sx={{
            position: "fixed",
            bottom: 20,
            left: "10px",
            background: "red",
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Drawer>
    </div>
  );
}

export default Sidebar;
