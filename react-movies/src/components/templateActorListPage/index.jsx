import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ActorList from "../actorList";
import Box from "@mui/material/Box";
import Header from "../headerActorList";

function ActorListPageTemplate({ actors, title, action }) {

  const [nameFilter, setNameFilter] = useState("");
  let displayedActors = actors
    .filter((a) => a.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
  };

  return (
    <Grid container direction="column" alignItems="center" sx={{ width: "100%", backgroundColor: "#f0f0f0" }}>
      <Box sx={{ width: "100%" }}>
        <Header
          sx={{ width: "100%" }}
          title={title}
          onUserInput={handleChange}
          nameFilter={nameFilter}
        />
      </Box>
      <Typography
        variant="h4"
        align="center"
        sx={{ mt: 4, mb: 2, fontWeight: "bold", width: "100%" }}
      >
        {title}
      </Typography>
      <Box sx={{ width: "100%" }}>
        <ActorList action={action} actors={displayedActors} />
      </Box>
    </Grid>
  );
}

export default ActorListPageTemplate;