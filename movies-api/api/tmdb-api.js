import fetch from 'node-fetch';

export const getMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
};


export const getMovie = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getTrendingMovie = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const getUpcomingMovie = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const getPopularMovie = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const getTopRatedMovie = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const getNowPlayingMovie = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};



export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
    process.env.TMDB_KEY +
    "&language=en-US"
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};



export const getLanguages = () => {
  return fetch(
    `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.TMDB_KEY}`
  )
  .then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        console.error("TMDB Error:", error);
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    console.error("Fetch error:", error);
    throw error;
  });
};


export const getMovieImages = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};


export const getMovieReviews = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};


export const getMovieRecommendations = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const getMovieCredits = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};



export const getMovieVideos = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const getPopularActor = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};




export const getActorImages = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};




export const getActor = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};



export const getActorCredits = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};
