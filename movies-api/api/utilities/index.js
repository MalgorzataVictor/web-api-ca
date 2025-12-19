import express from 'express';
import asyncHandler from 'express-async-handler';
import { getGenres } from '../tmdb-api';
const router = express.Router();


router.get('/genre/movie', asyncHandler(async (req, res) => {
    const getMovieGenre = await getGenres(req.query.page);
    res.status(200).json(getMovieGenre);
}));



export default router;


