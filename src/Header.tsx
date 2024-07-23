import * as React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  Container,
  Button,
  useTheme,
} from "@mui/material";
import viteLogo from "/vite.svg";

import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { Context } from "./context/Context";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link } from "react-router-dom";

const pages = [
  { path: "/ads", label: "آگهی ها" }, // Use objects with paths
  { path: "/create-ad", label: "ثبت آگهی جدید" },
];

export default function Header() {
  const theme = useTheme();
  const { toggleColorMode, isAuthenticated, setIsAuthenticated } =
    useContext(Context);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={viteLogo}
            alt="logo of vite"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="default"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "inherit", display: "block" }}
                  component={Link} // Use RouterLink for navigation
                  to={page.path} // Pass the path from the object
                >
                  {page.label}
                </Button>
              ))}
            </Menu>
          </Box>
          <Box
            component="img"
            src={viteLogo}
            alt="logo of vite"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "inherit", display: "block" }}
                component={Link} // Use RouterLink for navigation
                to={page.path} // Pass the path from the object
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <IconButton
              sx={{ fontSize: "1rem" }}
              onClick={toggleColorMode}
              color="inherit"
              disableTouchRipple
              disableRipple
            >
              {theme.palette.mode === "dark" ? (
                <span role="img" aria-label="sun">
                  <LightModeIcon />
                </span>
              ) : (
                <span role="img" aria-label="moon">
                  <DarkModeIcon />
                </span>
              )}
            </IconButton>

            {isAuthenticated ? (
              <Link
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => {
                  setIsAuthenticated(false);
                  sessionStorage.removeItem("user");
                }}
              >
                <Typography textAlign="center">خروج</Typography>
              </Link>
            ) : (
              <Link
                to="/sign-in"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography textAlign="center">ورود | ثبت نام</Typography>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
