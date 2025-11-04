import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import NotFound from "./NotFound.jsx";
import styles from "./App.module.css";
import { AuthContext } from "./AuthProvider.jsx";
import { useContext } from "react";

function App() {
  function Layout() {
    const { isLogged, logout, login } = useContext(AuthContext);

    return (
      <>
        <AppBar>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography>Company Name</Typography>

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
                <Link className={styles.link} onClick={logout}>
                  Logout
                </Link>
              </>
            ) : (
              <Link className={styles.link} onClick={login}>
                Login with ServiceNow
              </Link>
            )}
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 10 }}>
          <Outlet />
        </Container>
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
