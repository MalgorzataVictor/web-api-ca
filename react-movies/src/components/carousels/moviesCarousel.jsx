import React from "react";
import GenericCarousel from "./GenericCarousel";
import Movie from "../movieCard"; 

const MoviesCarousel = ({ movies, action }) => {
  return (
    <GenericCarousel
      items={movies}
      renderItem={(movie) => (
        <div>
          <Movie
            movie={movie}
            action={action} 
            sx={{ width: "200px" }}
          />
        </div>
      )}
    />
  );
};

export default MoviesCarousel;
