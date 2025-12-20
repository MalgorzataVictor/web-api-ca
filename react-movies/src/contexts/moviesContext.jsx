import React, { useState, useEffect } from "react";
import { addFavourite, deleteFavourite, getFavourites } from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([])
    const [watchlist, setWatchlist] = useState([])
    const [myReviews, setMyReviews] = useState({})

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const favs = await getFavourites();
                setFavorites(favs[0].favouritesList);
            } catch (err) {
                console.error("Failed to fetch favourites:", err);
            }
        };

        fetchFavourites();
    }, []);


    const addToFavorites = async (movie) => {

        if (!favorites.includes(movie.id)) {
            try {
                const updatedFavs = await addFavourite(movie.id);
                setFavorites(updatedFavs);
            } catch (err) {
                console.error("Failed to add favourite:", err);
            }
        }
    };


    const removeFromFavorites = async (movie) => {
            try {
                const updatedFavs = await deleteFavourite(movie.id);
                console.log(updatedFavs)
                setFavorites(updatedFavs);
                console.log(updatedFavs)
            } catch (err) {
                console.error("Failed to remove favourite:", err);
            }
        
    };


    const addToWatchlist = (movie) => {
        let newMustWatch = [];
        if (!watchlist.includes(movie.id)) {
            newMustWatch = [...watchlist, movie.id];
        }
        else {
            newMustWatch = [...watchlist];
        }
        setWatchlist(newMustWatch)
    };

    const addReview = (movie, review) => {
        setMyReviews({ ...myReviews, [movie.id]: review })
    };



    const removeFromWatchlist = (movie) => {
        setWatchlist(watchlist.filter(
            (mId) => mId !== movie.id
        ))
    };


    return (
        <MoviesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                addReview,
                watchlist,
                addToWatchlist,
                removeFromWatchlist
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );

};

export default MoviesContextProvider;
