import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from '@mui/material/Divider';
import { useNavigate, Link } from "react-router";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

import img from '../../images/logo.png';
import { AuthContext } from "../../contexts/authContext";



const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/home" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Watchlist", path: "/movies/watchlist" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Trending Today", path: "/movies/trending/today" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/topRated" },
    { label: "Now Playing", path: "/movies/nowPlaying" },
    { label: "Popular Actors", path: "/actors/popular" },
  ];

  const handleMenuSelect = (path) => {
    setDrawerOpen(false);
    navigate(path);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#cc0000" }}>
        <Toolbar sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={img}
            alt="Logo"
            sx={{ height: 64, width: 128 }}
          />

          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Malgosia Movies
            </Typography>
          </Box>

          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              position: "absolute",
              right: 48, 
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {context.isAuthenticated ? (
              <>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Hello, {context.userName}!
                </Typography>
                <Button
                  color="inherit"
                  sx={{ fontWeight: "bold" }}
                  component={Link}
                  to="/profile"
                >
                  Profile
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  sx={{ fontWeight: "bold" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  sx={{ fontWeight: "bold" }}
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </Button>
              </>
            )}
          </Box>

          <IconButton
            color="inherit"
            edge="end"
            onClick={() => setDrawerOpen(true)}
            sx={{ position: "absolute", right: 16 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>


      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              background: "linear-gradient(180deg, #cc0000 0%, #660000 100%)",
              color: "white",
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
              boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
              overflow: "hidden",
            },
          },
        }}
      >
        <Box sx={{ p: 2, position: "relative" }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              "&:hover": { color: "#ffcccc" },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mt: 1,
              mb: 3,
              fontWeight: "bold",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Menu
          </Typography>

          <List>
            {menuOptions.map((opt, index) => (
              <React.Fragment key={opt.label}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleMenuSelect(opt.path)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.2)",
                        transform: "translateX(-4px)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                      {opt.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={opt.label}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: "1.1rem",
                      }}
                    />
                  </ListItemButton>
                </ListItem>

                {(index === 0 || index === 2 || index === 7) && (
                  <>
                    <Divider sx={{ my: 1, backgroundColor: "rgba(255,255,255,0.3)" }} />
                    {index === 2 && (
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          mt: 2,
                          mb: 4,
                          fontWeight: "bold",
                          letterSpacing: 1,
                          textTransform: "uppercase",
                        }}
                      >
                        MOVIES
                      </Typography>
                    )}
                    {index === 7 && (
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          mt: 2,
                          mb: 4,
                          fontWeight: "bold",
                          letterSpacing: 1,
                          textTransform: "uppercase",
                        }}
                      >
                        ACTORS
                      </Typography>
                    )}
                  </>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>

      <Offset />
    </>
  );
};

export default SiteHeader;
