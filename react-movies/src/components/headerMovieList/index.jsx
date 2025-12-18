import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGenres, getLanguages } from "../../api/tmdb-api";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router";
import Spinner from "../spinner";

const Header = ({ movies = [], titleFilter, genreFilter, languageFilter, onUserInput }) => {
  const navigate = useNavigate();

  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [genreMenuAnchor, setGenreMenuAnchor] = useState(null);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterType, setFilterType] = useState("genre");

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  const { data: dataL, error: errorL, isPending: isPendingL, isError: isErrorL } = useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const genres = data.genres;
  if (genres[0].name !== "All") genres.unshift({ id: "0", name: "All" });

  if (isPendingL) return <Spinner />;
  if (isErrorL) return <h1>{errorL.message}</h1>;

  const all = { iso_639_1: "", english_name: "All", name: "" };

  const languages = [...(dataL || [])]; 
  languages.sort((a, b) =>
    a.english_name === "All" ? -1 : a.english_name.localeCompare(b.english_name)
  );

  if (!languages.some(l => l.english_name === "All")) {
    languages.unshift(all);
  }
  const handleTextChange = (e) => onUserInput("name", e.target.value);

  const handleFilterClick = (e) => setFilterAnchorEl(e.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);

  const handleGenreSelect = (id) => {
    onUserInput("genre", id);
    setGenreMenuAnchor(null);
  };

  const handleLanguageSelect = (code) => {
    onUserInput("language", code);
    setLanguageMenuAnchor(null);
  };

  const handleSortClick = (e) => setSortAnchorEl(e.currentTarget);
  const handleSortClose = () => setSortAnchorEl(null);
  const handleSortSelect = (type) => {
    onUserInput("sort", type);
    handleSortClose();
  };

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

      <IconButton aria-label="filter" onClick={handleFilterClick}>
        <FilterAltIcon sx={{ color: "#cc0000" }} fontSize="large" />
      </IconButton>

      <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
        <MenuItem
          selected={filterType === "genre"}
          onClick={() => {
            setFilterType("genre");
            setGenreMenuAnchor(filterAnchorEl);
            handleFilterClose();
          }}
        >
          By Genre
        </MenuItem>
        <MenuItem
          selected={filterType === "language"}
          onClick={() => {
            setFilterType("language");
            setLanguageMenuAnchor(filterAnchorEl);
            handleFilterClose();
          }}
        >
          By Language
        </MenuItem>

      </Menu>

      <Menu anchorEl={genreMenuAnchor} open={Boolean(genreMenuAnchor)} onClose={() => setGenreMenuAnchor(null)}>
        {genres.map((g) => (
          <MenuItem key={g.id} selected={genreFilter === g.id} onClick={() => handleGenreSelect(g.id)}>
            {g.name}
          </MenuItem>
        ))}
      </Menu>

      <Menu anchorEl={languageMenuAnchor} open={Boolean(languageMenuAnchor)} onClose={() => setLanguageMenuAnchor(null)}>
        {languages.map((c) => (
          <MenuItem
            key={c.iso_639_1}
            selected={languageFilter === c.iso_639_1}
            onClick={() => handleLanguageSelect(c.iso_639_1)}
          >
            {c.english_name}
          </MenuItem>
        ))}
      </Menu>

      <TextField
        label="Search"
        variant="outlined"
        type="search"
        value={titleFilter}
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

      <IconButton aria-label="sort" onClick={handleSortClick}>
        <SwapVertIcon sx={{ color: "#cc0000" }} fontSize="large" />
      </IconButton>

      <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={handleSortClose}>
        <MenuItem onClick={() => handleSortSelect("alphabetical-asc")}>Alphabetical (A → Z)</MenuItem>
        <MenuItem onClick={() => handleSortSelect("alphabetical-desc")}>Alphabetical (Z → A)</MenuItem>
        <MenuItem onClick={() => handleSortSelect("rating-desc")}>Rating (High → Low)</MenuItem>
        <MenuItem onClick={() => handleSortSelect("rating-asc")}>Rating (Low → High)</MenuItem>
      </Menu>

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
