import {
  Box,
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

const drawerWidth = 240;

function Sidebar() {
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
          {[
            { name: "Overview", path: "account" },
            { name: "Transactions", path: "transactions" },
          ].map((text, index) => (
            <ListItem button key={index} component={Link} to={text.path}>
              <ListItemText primary={text.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Button
          color='secondary'
          size='small'
          sx={{
            background: "#6c74cc",
            borderRadius: 3,
            border: 0,
            color: "white",
            height: 48,
            padding: "0 30px",
            width: 200,
            // width: "fit-content`",
          }}
          onClick={() => console.log("Logout")}
        >
          Logout
        </Button>
      </Drawer>
    </div>
  );
}

export default Sidebar;
