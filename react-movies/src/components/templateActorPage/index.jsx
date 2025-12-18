

import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getActorImages } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import Paper from "@mui/material/Paper";
import ActorHeader from "../headerActor";
import React from "react";


const TemplateActorPage = ({ actor, children }) => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['actorImages', { id: actor.id }],
    queryFn: getActorImages,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actorImages = data.profiles


  return (
    <>

      <ActorHeader actor={actor} />
      <Grid container spacing={5} style={{ padding: "15px", backgroundColor: "#f0f0f0" }}>
        <Grid size={{ xs: 3 }}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
             <Paper
            elevation={4}
           sx={{
              padding: "32px",
              borderRadius: "16px",
              backgroundColor: "#fafafa",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              height: "100%",
              overflowY: "auto"
            }}
          >
            <ImageList
              sx={{
                height: "100vh",
              }}
              cols={1}
            >
              {actorImages.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={image.file_path}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            </Paper>
          </div>
        </Grid>

        <Grid size={{ xs: 9 }}>
           <Paper
            elevation={4}
            sx={{
              padding: "24px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            }}
          >
            {children}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateActorPage;
