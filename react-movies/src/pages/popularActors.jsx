import React, { useContext, useState } from "react";
import PageTemplate from '../components/templateActorListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import { Box } from "@mui/material";
import Pagination from "../components/pagination";
import { getPopularActor } from "../api/tmdb-api";
import { Helmet } from "react-helmet-async";




const PopularActors = (props) => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['popularActors', page],
    queryFn: () => getPopularActor(page),
    keepPreviousData: true,
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const actors = data.results;

  return (
    <>
      <Helmet>
        <title>{"Popular Actors"}</title>
      </Helmet>
      <Box sx={{ p: 2 }}>
        <PageTemplate
          title="Popular Actors"
          actors={actors}
        />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </Box>

      </Box>
    </>
  );
};
export default PopularActors;
