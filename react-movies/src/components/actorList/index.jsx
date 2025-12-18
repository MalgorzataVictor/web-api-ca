import React from "react";
import Actor from "../actorCard/";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const ActorList = (props) => {
  return (
    <Box sx={{ px: { xs: 4, sm: 6, md: 12 }, py: 8 }}>
      <Grid container spacing={4} justifyContent="center">
        {props.actors.map((a) => (
          <Actor
            key={a.id}
            actor={a}
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

export default ActorList;
