import React, { useContext } from "react";
import { Link } from "react-router";
import { Box, Paper, Typography, Button } from "@mui/material";
import { AuthContext } from "../contexts/authContext";

const StartPage = () => {
  const context = useContext(AuthContext);

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

        {context.isAuthenticated ? (
          <>
            <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
              Go to your profile to manage your favorites and watchlist.
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
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
              Login or Sign Up to see the movies!
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  color: "#cc0000",
                  borderColor: "#cc0000",
                  "&:hover": { backgroundColor: "#cc0000", color: "#fff", borderColor: "#cc0000" },
                  fontWeight: "bold",
                  minWidth: 100,
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  backgroundColor: "#cc0000",
                  "&:hover": { backgroundColor: "#990000" },
                  fontWeight: "bold",
                  minWidth: 100,
                }}
              >
                Sign Up
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default StartPage;
