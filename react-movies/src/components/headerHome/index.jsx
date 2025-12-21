import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import React from "react";

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "8px 12px",
        marginBottom: 1,
      }}
    >
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ color: "#cc0000" }} fontSize="large" />
      </IconButton>

      <IconButton aria-label="home" onClick={() => navigate("/home")}>
        <HomeIcon sx={{ color: "#cc0000" }} fontSize="large" />
      </IconButton>

      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>

      <IconButton
        aria-label="favourites"
        onClick={() => navigate("/movies/favorites")}
      >
        <FavoriteIcon sx={{ color: "#cc0000" }} fontSize="large" />
      </IconButton>

      <IconButton aria-label="go forward" onClick={() => navigate(1)}>
        <ArrowForwardIcon sx={{ color: "#cc0000" }} fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;
