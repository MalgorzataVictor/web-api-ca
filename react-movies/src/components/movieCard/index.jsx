import React, { useContext } from "react";
import { useNavigate, Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import img from '../../images/film-poster-placeholder.png';
import { MoviesContext } from "../../contexts/moviesContext";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);
  const { watchlist, addToWatchlist } = useContext(MoviesContext);
  const navigate = useNavigate();

  movie.favorite = favorites.includes(movie.id);
  movie.mustwatch = watchlist.includes(movie.id);

  const handleAddToFavorite = (e) => {
    addToFavorites(movie);
  };

  const handleAddToWatchlist = (e) => {
    addToWatchlist(movie);
  };

  const newDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.03)", cursor: "pointer" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        avatar={
          <>
            {movie.favorite && (
              <IconButton onClick={handleAddToFavorite}>
                <Avatar sx={{ backgroundColor: "#cc0000" }}>
                  <FavoriteIcon />
                </Avatar>
              </IconButton>
            )}

            {movie.mustwatch && (
              <IconButton onClick={handleAddToWatchlist}>
                <Avatar sx={{ backgroundColor: "#1976d2" }}>
                  <PlaylistAddIcon />
                </Avatar>
              </IconButton>
            )}
          </>
        
        }

      title={
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center", whiteSpace: "normal" }}
        >
          {movie.title}
        </Typography>
      }
      sx={{
        height: 64,
        padding: 1,
      }}
      />

      <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img}
          alt={movie.title}
          sx={{
            width: "100%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
          }}
        />
      </Link>

      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={0.5}>
            <CalendarIcon fontSize="small" sx={{ color: "#555" }} />
            <Typography variant="body2" color="textSecondary">
              {newDate(movie.release_date)}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <StarRateIcon fontSize="small" sx={{ color: "#fbc02d" }} />
            <Typography variant="body2" color="textSecondary">
              {movie.vote_average.toFixed(1)}
            </Typography>
          </Box>
        </Grid>
      </CardContent>


      <CardActions sx={{ justifyContent: "space-between", paddingX: 2, paddingBottom: 2 }}>
        {action(movie)}
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="medium"
            sx={{
              backgroundColor: "#cc0000",
              color: "#fff",
              "&:hover": { backgroundColor: "#b30000" },
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            More Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
