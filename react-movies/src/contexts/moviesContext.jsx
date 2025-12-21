import React, { useState, useEffect, useContext } from "react";
import { addFavourite, deleteFavourite, getFavourites, addWatchlist, deleteWatchlist, getWatchlist } from "../api/tmdb-api";
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


     useEffect(() => {
        const fetchWatchlist = async () => {
            if (!authToken) { 
                setWatchlist([]); 
                return;
            }

            try {
                const mustwatch = await getWatchlist();
                setWatchlist(mustwatch[0]?.watchList || []);
            } catch (err) {
                console.error("Failed to fetch watchlist:", err);
                setWatchlist([]);
            }
        };

        fetchWatchlist();
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


      const addToWatchlist = async (movie) => {
        if (!watchlist.includes(movie.id)) {
            try {
                const updatedWatchList = await addWatchlist(movie.id);
                setWatchlist(updatedWatchList);
            } catch (err) {
                console.error("Failed to add to watchlist:", err);
            }
        }
    };

        const removeFromWatchlist = async (movie) => {
        try {
            const updatedWatchList = await deleteWatchlist(movie.id);
            setWatchlist(updatedWatchList);
        } catch (err) {
            console.error("Failed to remove from watchlist:", err);
        }
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
