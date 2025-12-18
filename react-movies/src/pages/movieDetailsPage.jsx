import React from "react";
import { useParams } from "react-router";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieRecommendations, getMovieCredits, getMovieVideos } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { Helmet } from "react-helmet-async";

const MoviePage = () => {
  const { id } = useParams();

  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  });

  const {
    data: recommendations, error: recError, isPending: recPending, isError: recIsError } = useQuery({
      queryKey: ["movieRecommendations", { id }],
      queryFn: getMovieRecommendations,
    });

  const {
    data: credits, error: creError, isPending: crePending, isError: creIsError } = useQuery({
      queryKey: ["movieCredits", { id }],
      queryFn: getMovieCredits,
    });

  const {
    data: videos, error: vidError, isPending: vidPending, isError: vidIsError } = useQuery({
      queryKey: ["movieVideos", { id }],
      queryFn: getMovieVideos,
    });

  if (isPending || recPending || crePending || vidPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;
  if (recIsError) return <h1>{recError.message}</h1>;
  if (creIsError) return <h1>{creError.message}</h1>;
  if (vidIsError) return <h1>{vidError.message}</h1>;

  return (
    <>
      <Helmet>
        <title>{movie ? ` ${movie.title}` : "Movie Details"}</title>
      </Helmet>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails
            movie={movie}
            recommendations={recommendations?.results || []}
            credits={credits || null}
            videos={videos || null}
          />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
