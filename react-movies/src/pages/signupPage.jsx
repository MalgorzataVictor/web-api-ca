import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/authContext";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const register = () => {
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }
    context.register(userName, password);
    navigate("/login");
  };

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
          maxWidth: 400,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#cc0000" }}>
          Sign Up
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
          Create an account to access all features
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={register}
          sx={{
            backgroundColor: "#cc0000",
            "&:hover": { backgroundColor: "#990000" },
            mb: 2,
            py: 1.5,
            fontWeight: "bold",
          }}
        >
          Register
        </Button>

        <Typography variant="body2">
          Already have an account?{" "}
          <Button
            onClick={() => navigate("/login")}
            sx={{ color: "#cc0000", fontWeight: "bold", textTransform: "none", p: 0 }}
          >
            Log In
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUpPage;
