import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React from "react";

const MovieList = (props) => {
  return (
    <Box sx={{ px: { xs: 4, sm: 6, md: 12 }, py: 8 }}>
      <Grid container spacing={4} justifyContent="center">
        {props.movies.map((m) => (
          <Movie
            key={m.id}
            movie={m}
            action={props.action}
            sx={{
              flexBasis: {
                xs: "100%", 
                sm: "50%",  
                md: "33.33%", 
                lg: "25%", 
                xl: "16.66%", 
              },
            }}
          />
        ))}
      </Grid>
    </Box>
    
  );
};

export default MovieList;
