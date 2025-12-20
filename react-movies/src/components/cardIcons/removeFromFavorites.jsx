import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { deleteFavourite } from "../../api/tmdb-api"

const RemoveFromFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromFavorites = async (e) => {
    e.preventDefault();
    try {
      await deleteFavourite(movie.id); 
      context.removeFromFavorites(movie); 
    } catch (error) {
      console.error('Failed to remove favorite', error);
    }
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;
