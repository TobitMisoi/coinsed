import { createTheme } from "@mui/material";
import { blue, indigo } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: indigo[900],
    },
    secondary: {
      main: blue[300],
    },
    common: {
      black: "#000100",
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 14,
  },
});

export default theme;
