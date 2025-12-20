import React, { useState, useEffect, useContext } from "react";
import { addFavourite, deleteFavourite, getFavourites } from "../api/tmdb-api";
import { AuthContext } from "./authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const { authToken } = useContext(AuthContext); 
    const [favorites, setFavorites] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [myReviews, setMyReviews] = useState({});

    
    useEffect(() => {
        const fetchFavourites = async () => {
            if (!authToken) { 
                setFavorites([]); 
                return;
            }

            try {
                const favs = await getFavourites();
                setFavorites(favs[0]?.favouritesList || []);
            } catch (err) {
                console.error("Failed to fetch favourites:", err);
                setFavorites([]);
            }
        };

        fetchFavourites();
    }, [authToken]); 

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
            setFavorites(updatedFavs);
        } catch (err) {
            console.error("Failed to remove favourite:", err);
        }
    };

    const addToWatchlist = (movie) => {
        let newMustWatch = watchlist.includes(movie.id) ? [...watchlist] : [...watchlist, movie.id];
        setWatchlist(newMustWatch);
    };

    const removeFromWatchlist = (movie) => {
        setWatchlist(watchlist.filter((mId) => mId !== movie.id));
    };

    const addReview = (movie, review) => {
        setMyReviews({ ...myReviews, [movie.id]: review });
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
