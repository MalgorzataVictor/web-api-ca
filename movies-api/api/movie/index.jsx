import express from 'express';
import asyncHandler from 'express-async-handler';
import {getMovieImages, getMovieReviews, getMovieRecommendations, getMovieCredits, getMovieVideos } from '../tmdb-api';
const router = express.Router();


router.get('/:id/images', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const getImages = await getMovieImages(id);
    res.status(200).json(getImages);
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const getReviews = await getMovieReviews(id);
    res.status(200).json(getReviews);
}));


router.get('/:id/recommendations', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const getRecommendations = await getMovieRecommendations(id);
    res.status(200).json(getRecommendations);
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const getCredits = await getMovieCredits(id);
    res.status(200).json(getCredits);
}));

router.get('/:id/videos', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const getVideos = await getMovieVideos(id);
    res.status(200).json(getVideos);
}));


export default router;


