import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import React from "react";

const ActorHeader = (props) => {
  const actor = props.actor;
  const navigate = useNavigate();

  return (
    <Paper
      component="div"
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "16px 24px",
        marginBottom: 2,
        borderRadius: "12px",
        background: "linear-gradient(135deg, #fafafa, #f5f5f5)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ color: "#cc0000" }} fontSize="large" />
      </IconButton>


      <div style={{ textAlign: "center", flex: 1 }}>
        <Typography
          variant="h2"
          component="h3"
          sx={{

            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {actor.name}
        </Typography>
      </div>

      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon sx={{ color: "#cc0000" }} fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default ActorHeader;
