export const getMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/discover`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};



export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};


export const getTrendingMovie = (page = 1) => {
  return fetch(
    `http://localhost:8080/api/movies/trending/today?page=${page}`
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
    `http://localhost:8080/api/movies/upcoming?page=${page}`
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
    `http://localhost:8080/api/movies/popular?page=${page}`
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
    `http://localhost:8080/api/movies/top_rated?page=${page}`
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
    `http://localhost:8080/api/movies/now_playing?page=${page}`
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
    `http://localhost:8080/api/utilities/genre/movie`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getLanguages = () => {
  return fetch(
    `http://localhost:8080/api/utilities/configuration/languages`
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


export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movie/${id}/images`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};


export const getMovieReviews = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movie/${id}/reviews`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};


export const getMovieRecommendations = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movie/${id}/recommendations`
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


export const getMovieCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movie/${id}/credits`
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

export const getMovieVideos = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movie/${id}/videos`
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
    `http://localhost:8080/api/person/popular?page=${page}`
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


export const getActorImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/person/${id}/images`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};



export const getActor = (args) => {
  console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/person/${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};


export const getActorCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
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



export const login = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};

export const signup = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users?action=register', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};


export const getFavourites = async () => {
  const response = await fetch(
    `http://localhost:8080/api/userStore`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};



export const addFavourite = async (id) => {
  const data = { "movieId": id }
  const res = await fetch(
    `http://localhost:8080/api/userStore/favourite`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    }
  )
  return res.json();
};


export const deleteFavourite = async (id) => {
  const data = { movieId: id };
  
  const res = await fetch(
    `http://localhost:8080/api/userStore/favourite`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': window.localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error('Failed to delete favorite');
  }

  return await res.json(); 
};
