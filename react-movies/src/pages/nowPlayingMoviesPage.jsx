import React, { useState } from "react";
import { getNowPlayingMovie } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import { Box } from "@mui/material";
import Pagination from "../components/pagination";
import { Helmet } from "react-helmet-async";


const NowPlayingMoviePage = (props) => {
	const [page, setPage] = useState(1);

	const { data, error, isPending, isError } = useQuery({
		queryKey: ['nowPlaying', page],
		queryFn: () => getNowPlayingMovie(page),
		keepPreviousData: true,
	})

	if (isPending) {
		return <Spinner />
	}

	if (isError) {
		return <h1>{error.message}</h1>
	}

	const movies = data.results;

	return (
		<>
			<Helmet>
				<title>{ "Now Playing"}</title>
			</Helmet>
			<Box sx={{ p: 2 }}>
				<PageTemplate
					title="Now Playing Movies"
					movies={movies}
					action={(movie) => {
					}}
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
export default NowPlayingMoviePage;
