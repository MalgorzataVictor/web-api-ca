import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { Helmet } from "react-helmet-async";

const WriteReviewPage = (props) => {
  const location = useLocation();
  const movieId = location.state.movieId;

  const { data: movie, error, isLoading, isError } = useQuery({
    queryKey: ['movie', {id: movieId}],
    queryFn: getMovie,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  
return (
    <>
      <Helmet>
        <title>{"Add Review"}</title>
      </Helmet>
      <PageTemplate movie={movie}>
        <ReviewForm movie={movie} />
      </PageTemplate>
    </>
  );
};

export default WriteReviewPage;
