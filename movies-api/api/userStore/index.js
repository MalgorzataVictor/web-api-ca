import express from 'express';
import UserStore from './userStoreModel';
//import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line

// Get a user's favourites
router.get('/', async (req, res) => {
    const favourties = await UserStore.find({ userId: `${req.user._id}`});
    res.status(200).json(favourties);
});


export default router;
