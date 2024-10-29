const { createTheme } = require("@mui/material");

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    black: {
      main: "#000000",
    },
    background: {
      main: "#121212",
      default: "#121212",
      paper: "#333333",
    },
    textColor: {
      main: "#ffffff",
      secondary: "#ffffff",
    },
  },
});
