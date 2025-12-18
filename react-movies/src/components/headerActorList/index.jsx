import React from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router";

const Header = ({ actors = [], nameFilter, onUserInput }) => {
  const navigate = useNavigate();
  
  const handleTextChange = (e) => onUserInput("name", e.target.value);



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

      <IconButton aria-label="home" onClick={() => navigate("/")}>
        <HomeIcon sx={{ color: "#cc0000" }} fontSize="large" />
      </IconButton>

      <TextField
        label="Search"
        variant="outlined"
        type="search"
        value={nameFilter}
         onChange={handleTextChange}
        sx={{
          minWidth: "50%",
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            backgroundColor: "#fff",
            "& fieldset": { borderColor: "#ccc" },
            "&:hover fieldset": { borderColor: "#cc0000" },
            "&.Mui-focused fieldset": { borderColor: "#cc0000" },
          },
        }}
      />

      <IconButton aria-label="favourites" onClick={() => navigate("movies/favorites")}>
        <FavoriteIcon sx={{ color: "#cc0000" }} fontSize="large" />
      </IconButton>

      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon sx={{ color: "#cc0000" }} fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;
