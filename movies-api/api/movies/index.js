import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getUpcomingMovie, getMovie } from '../tmdb-api'; 


const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovie(req.query.page);
    res.status(200).json(upcomingMovies);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const getOneMovie = await getMovie(id);
    res.status(200).json(getOneMovie);
}));


export default router;


