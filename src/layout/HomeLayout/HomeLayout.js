import { makeStyles } from "@mui/styles";
import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../components/Main";

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
});

function HomeLayout({ children }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Header />
        {children || <Outlet />}
        <Footer />
      </div>
    </>
  );
}

export default HomeLayout;
