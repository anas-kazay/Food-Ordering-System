import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { DarkTheme } from "./Theme/DarkTheme";
import CustomerRouter from "./Routers/CustomerRouter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./State/Authentication/Action";
import { findCart } from "./State/Cart/Action";
import Routers from "./Routers/Routers";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt));
  }, [auth.jwt]);

  return (
    <div className="App">
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        <Routers />
      </ThemeProvider>
    </div>
  );
}

export default App;
