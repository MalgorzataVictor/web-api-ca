import express from 'express';
import UserStore from './userStoreModel';
//import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line

// Get a user's favourites
router.get('/', async (req, res) => {
    if (!req.user.isAuthenticated) {
        res.status(401).json({ msg: "Unauthorized" });
    }
    const favourties = await UserStore.find({ userId: `${req.user._id}`});
    res.status(200).json(favourties);
});


router.put('/favourite', async (req, res) => {
    if (!req.user.isAuthenticated) {
        res.status(401).json({ msg: "Unauthorized" });
    }
    const { movieId } = req.body;

    if (!movieId) {
        return res.status(400).json({ msg: 'movieId is required' });
    }

    const store = await UserStore.findOneAndUpdate(
        { userId: req.user._id },
        { $addToSet: { favouritesList: movieId } }, 
        { new: true, upsert: true } 
    );

    res.status(200).json(store.favouritesList);
});


router.delete('/favourite', async (req, res) => {
    if (!req.user.isAuthenticated) {
        res.status(401).json({ msg: "Unauthorized" });
    }
    console.log(req)
    const { movieId } = req.body;

    if (!movieId) {
        return res.status(400).json({ msg: 'movieId is required' });
    }
    

    const store = await UserStore.findOneAndUpdate(
        { userId: req.user._id },
        { $pull: { favouritesList: movieId } }, 
        { new: true }
    );

    res.status(200).json(store?.favouritesList || []);
    
});

export default router;
