import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getUpcomingMovie } from '../tmdb-api'; 


const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovie(req.query.page);
    res.status(200).json(upcomingMovies);
}));


export default router;


