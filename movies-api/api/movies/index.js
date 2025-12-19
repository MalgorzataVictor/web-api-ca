import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getUpcomingMovie, getMovie, getTrendingMovie, getPopularMovie } from '../tmdb-api'; 


const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const getOneMovie = await getMovie(id);
    res.status(200).json(getOneMovie);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovie(req.query.page);
    res.status(200).json(upcomingMovies);
}));

router.get('/trending/today', asyncHandler(async (req, res) => {
    const trendingMovies = await getTrendingMovie(req.query.page);
    res.status(200).json(trendingMovies);
}));

router.get('/popular', asyncHandler(async (req, res) => {
    const popularMovies = await getPopularMovie(req.query.page);
    res.status(200).json(popularMovies);
}));




export default router;


