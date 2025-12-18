import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies, getPopularActor } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import MoviesCarousel from "../components/carousels/moviesCarousel";
import Header from "../components/headerHome";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import VideosCarousel from "../components/carousels/videosCarousel";
import Masonry from "@mui/lab/Masonry";
import { Link } from "react-router";
import img from "../images/actor-image-placeholder.png";
import Footer from "../components/footer";
import { Helmet } from "react-helmet-async";


const HomePage = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["discover"],
    queryFn: getMovies,
  });

  const { data: actorsData, isPending: actorsLoading, isError: actorsError, error: actorsErrorMsg, } = useQuery({
    queryKey: ["popular-actors"],
    queryFn: () => getPopularActor(1),
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;
  if (actorsLoading) return <Spinner />;
  if (actorsError) return <h1>{actorsErrorMsg.message}</h1>;

  const movies = data.results;

  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  return (
    
    <Box sx={{ width: "100%", backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <Header />
       <Helmet>
        <title>Malgosia Movies</title>
      </Helmet>
      <Paper
        elevation={3}
        sx={{
          ml: 4,
          mt: 4,
          mr: 4,
          pb: 4,
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ pt: 2, pb:2, fontWeight: "bold" }}
        >
          Discover Movies
        </Typography>

        <MoviesCarousel
          movies={movies}
          action={(movie) => <AddToFavoritesIcon movie={movie} />}
        />
      </Paper>

      <Paper
        elevation={3}
        sx={{
          ml: 4,
          mt: 4,
          mr: 4,
          pb: 4,
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ pt: 2, pb:2, fontWeight: "bold" }}
        >
          Popular Actors
        </Typography>

        {actorsLoading && <Spinner />}
        {actorsError && (
          <Typography color="error" align="center">
            {actorsErrorMsg.message}
          </Typography>
        )}

        {actorsData && (
          <Box sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
            <Masonry columns={{ xs: 3, sm: 4, md: 6 }} spacing={1}>
              {actorsData.results.slice(0, 12).map((actor) => (
                <Link
                  key={actor.id}
                  to={`/actors/${actor.id}`}
                  style={{
                    display: "block",
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                        : img
                    }
                    alt={actor.name}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "256px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      transition: "transform 0.3s ease, filter 0.3s ease",
                      filter: "brightness(0.9)",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.filter = "brightness(1)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.filter = "brightness(0.9)";
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6) 20%, transparent)",
                      color: "white",
                      textAlign: "center",
                      py: 0.5,
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                    }}
                  >
                    {actor.name}
                  </Box>
                </Link>
              ))}
            </Masonry>
          </Box>
        )}
      </Paper>



      <Paper
        elevation={3}
        sx={{
          ml: 4,
          mt: 4,
          mr: 4,
          pb: 4,
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ pt: 2, pb:2, fontWeight: "bold" }}
        >
          Movie Trailers
        </Typography>

        <VideosCarousel movies={movies} />
      </Paper>

      <Footer />

    </Box>


  );
};

export default HomePage;
