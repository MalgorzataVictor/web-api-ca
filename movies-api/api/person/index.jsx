import express from 'express';
import asyncHandler from 'express-async-handler';
import {getPopularActor, getActorImages, getActor , getActorCredits} from '../tmdb-api';
const router = express.Router();


router.get('/popular', asyncHandler(async (req, res) => {
    const popularActor = await getPopularActor(req.query.page);
    res.status(200).json(popularActor);
}));


router.get('/:id/images', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const getImages = await getActorImages(id);
    res.status(200).json(getImages);
}));


router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const getOnActor = await getActor(id);
    res.status(200).json(getOnActor);
}));

router.get('/:id/movie_credits', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const getCredits = await getActorCredits(id);
    res.status(200).json(getCredits);
}));



export default router;


