import React from "react";
import { Link } from "react-router";
import { Box, Paper, Typography, Button } from "@mui/material";

const StartPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 500,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#cc0000" }}>
          Welcome to Malgosia Movies!
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
          View your profile to manage your favorites and watchlist.
        </Typography>

        <Button
          component={Link}
          to="/profile"
          variant="contained"
          sx={{
            backgroundColor: "#cc0000",
            "&:hover": { backgroundColor: "#990000" },
            mb: 2,
            py: 1.5,
            fontWeight: "bold",
            width: "100%",
          }}
        >
          Go to Profile
        </Button>

        <Typography variant="body1" sx={{ mt: 2, color: "#555" }}>
          <Link to="/login" style={{ color: "#cc0000", fontWeight: "bold", textDecoration: "none", marginRight: 8 }}>
            Login
          </Link>
          or
          <Link to="/signup" style={{ color: "#cc0000", fontWeight: "bold", textDecoration: "none", marginLeft: 8 }}>
            Signup
          </Link>{" "}
          to see the movies!
        </Typography>
      </Paper>
    </Box>
  );
};

export default StartPage;
