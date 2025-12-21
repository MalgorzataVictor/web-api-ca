import express from 'express';
import UserStore from './userStoreModel';

const router = express.Router(); // eslint-disable-line


router.get('/', async (req, res) => {
    if (!req.user.isAuthenticated) {
        res.status(401).json({ msg: "Unauthorized" });
    }
    const favourties = await UserStore.find({ userId: `${req.user._id}`});
    res.status(200).json(favourties);
});


router.post('/favourite', async (req, res) => {
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



router.post('/watchlist', async (req, res) => {
    if (!req.user.isAuthenticated) {
        res.status(401).json({ msg: "Unauthorized" });
    }
    const { movieId } = req.body;

    if (!movieId) {
        return res.status(400).json({ msg: 'movieId is required' });
    }

    const store = await UserStore.findOneAndUpdate(
        { userId: req.user._id },
        { $addToSet: { watchList: movieId } }, 
        { new: true, upsert: true } 
    );

    res.status(200).json(store.watchList);
});


router.delete('/watchlist', async (req, res) => {
    if (!req.user.isAuthenticated) {
        res.status(401).json({ msg: "Unauthorized" });
    }
    const { movieId } = req.body;

    if (!movieId) {
        return res.status(400).json({ msg: 'movieId is required' });
    }
    

    const store = await UserStore.findOneAndUpdate(
        { userId: req.user._id },
        { $pull: { watchList: movieId } }, 
        { new: true }
    );

    res.status(200).json(store?.watchList || []);
    
});

export default router;
