import React, { useContext } from "react";
import "./app.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Topbar from "./components/Topbar/Topbar";
import AnimatedRoutes from "./AnimatedRoutes";
import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffd8d7",
    },
    secondary: {
      main: "#fd423d",
    },
  },
});

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          {user && <Topbar />}
          <AnimatedRoutes user={user} />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
