import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";

import SiteHeader from "./components/siteHeader";
import MoviesContextProvider from "./contexts/moviesContext";

import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import ActorPage from "./pages/actorDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingeMoviesPage from "./pages/upcomingMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import TrendingMoviePage from "./pages/trendingMoviesPage";
import PopularMoviePage from "./pages/popularMoviesPage";
import TopRatedMoviePage from "./pages/topRatedMoviesPage";
import NowPlayingMoviePage from "./pages/nowPlayingMoviesPage";
import WatchlistMoviesPage from "./pages/watchlistMoviesPage";
import PopularActors from "./pages/popularActors";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/watchlist" element={<WatchlistMoviesPage />} />
              <Route path="/movies/upcoming" element={<UpcomingeMoviesPage />} />
              <Route path="/movies/trending/today" element={<TrendingMoviePage />} />
              <Route path="/movies/popular" element={<PopularMoviePage />} />
              <Route path="/movies/topRated" element={<TopRatedMoviePage />} />
              <Route path="/movies/nowPlaying" element={<NowPlayingMoviePage />} />
              <Route path="/actors/popular" element={<PopularActors />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/actors/:id" element={<ActorPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </HelmetProvider>
    </QueryClientProvider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
