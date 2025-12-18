import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([])
    const [watchlist, setWatchlist] = useState([])
    const [myReviews, setMyReviews] = useState({})


    const addToFavorites = (movie) => {
        let newFavorites = [];
        if (!favorites.includes(movie.id)) {
            newFavorites = [...favorites, movie.id];
        }
        else {
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites)
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


    const removeFromFavorites = (movie) => {
        setFavorites(favorites.filter(
            (mId) => mId !== movie.id
        ))
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
