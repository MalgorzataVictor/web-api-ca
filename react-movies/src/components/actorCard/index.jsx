import React from "react";
import { useNavigate, Link } from "react-router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StarRateIcon from "@mui/icons-material/StarRate";
import img from '../../images/actor-image-placeholder.png';

export default function ActorCard({ actor }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.03)", cursor: "pointer" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", textAlign: "center", whiteSpace: "normal" }}
          >
            {actor.name}
          </Typography>
        }
        sx={{ height: 64, padding: 1 }}
      />
      <Link to={`/actors/${actor.id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          image={actor.profile_path ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : img}
          alt={actor.name}
          sx={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
        />
      </Link>
      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 1,
          gap: 0.5,
        }}
      >
        <StarRateIcon color="warning" />
        <Typography variant="body2" color="textSecondary">
          {actor.popularity.toFixed(1)}
        </Typography>
      </Box>
    </Card>
  );
}
