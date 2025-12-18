import React from "react";
import GenericCarousel from "./GenericCarousel";
import { useQueries } from "@tanstack/react-query";
import { getMovieVideos } from "../../api/tmdb-api";

const VideosCarousel = ({ movies }) => {
  const queries = useQueries({
    queries: movies.slice(0, 5).map((movie) => ({
      queryKey: ["movieVideos", { id: movie.id }],
      queryFn: getMovieVideos,
    })),
  });

  const videos = queries
    .map((q) => (q.data?.results?.length ? q.data.results[0] : null))
    .filter(Boolean);

  return (
    <GenericCarousel
      items={videos}
      renderItem={(video) => (
        <div style={{ padding: "0 16px" }}>
          <iframe
            width="300"
            height="170"
            src={`https://www.youtube.com/embed/${video.key}`}
            title={video.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: "8px" }}
          ></iframe>
        </div>
      )}
      settings={{
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 0,      
        speed: 30000,          
        cssEase: "linear",     
        pauseOnHover: true,    
        arrows: true,
        responsive: [
          { breakpoint: 1200, settings: { slidesToShow: 2 } },
          { breakpoint: 900, settings: { slidesToShow: 2 } },
          { breakpoint: 600, settings: { slidesToShow: 1 } },
        ],
      }}
    />
  );
};

export default VideosCarousel;
