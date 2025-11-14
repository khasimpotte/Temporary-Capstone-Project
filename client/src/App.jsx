import { AppBar, Toolbar, Typography, Container, Box, Button, CssBaseline } from "@mui/material";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import NotFound from "./NotFound.jsx";
import styles from "./App.module.css";
import { AuthContext } from "./AuthProvider.jsx";
import { useContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreateIncident from "./CreateIncident.jsx";
import EditIncident from "./EditIncident.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  function Layout() {
    const { isLogged, logout, login } = useContext(AuthContext);

    return (
      <>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>

            <Box
              component="img"
              src="src/images/revature_logo.png"
              alt="Company Logo"
              sx={{
                height: 40,
                width: "auto",
              }}
            />


            {isLogged ? (
              <>
                <Link className={styles.link} to="/">
                  Home
                </Link>
                <Link className={styles.link} to="/about">
                  About
                </Link>
                <Link className={styles.link} to="/does-not-exist">
                  404 Test
                </Link>

                <Link
                  className={styles.link}
                  onClick={() => {
                    logout();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </Link>


              </>
            ) : (
              <Link className={styles.link} onClick={login}>
                Login with ServiceNow
              </Link>
            )}

            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setDarkMode(!darkMode)}
            >
              Dark Mode: {darkMode ? "ON" : "OFF"}
            </Button>

          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 10 }}>
          <Outlet />
        </Container>
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/create-incident" element={<CreateIncident />} />
          <Route path="/edit-incident/:sys_id" element={<EditIncident />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
