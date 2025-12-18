import React, { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router";
import { Box, Paper, Typography, Button } from "@mui/material";

const ProfilePage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

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
        {context.isAuthenticated ? (
          <>
            <Typography
              variant="h4"
              sx={{ mb: 2, fontWeight: "bold", color: "#cc0000" }}
            >
              Profile
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
              Welcome, <strong>{context.userName}</strong>!
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#cc0000",
                "&:hover": { backgroundColor: "#990000" },
                fontWeight: "bold",
                py: 1.5,
              }}
              onClick={() => context.signout()}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Typography
              variant="h5"
              sx={{ mb: 2, fontWeight: "bold", color: "#cc0000" }}
            >
              Access Denied
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
              You must log in to see your profile.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#cc0000",
                "&:hover": { backgroundColor: "#990000" },
                fontWeight: "bold",
                py: 1.5,
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ProfilePage;
