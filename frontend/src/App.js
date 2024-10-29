import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { DarkTheme } from "./Theme/DarkTheme";
import CustomerRouter from "./Routers/CustomerRouter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./State/Authentication/Action";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
  }, [auth.jwt]);
  return (
    <div className="App">
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        {/* <Navbar /> */}
        {/* <Home /> */}
        {/* <RestaurantDetails /> */}
        {/* <Cart /> */}
        {/* <Profile /> */}
        <CustomerRouter />
      </ThemeProvider>
    </div>
  );
}

export default App;
