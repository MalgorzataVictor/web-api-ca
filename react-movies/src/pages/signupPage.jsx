import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/authContext";
import { Box, TextField, Button, Typography, Paper, LinearProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});


  const requirements = [
    {
      label: "At least 8 characters",
      test: (pw) => pw.length >= 8,
    },
    {
      label: "At least 1 uppercase letter",
      test: (pw) => /[A-Z]/.test(pw),
    },
    {
      label: "At least 1 lowercase letter",
      test: (pw) => /[a-z]/.test(pw),
    },
    {
      label: "At least 1 number",
      test: (pw) => /\d/.test(pw),
    },
    {
      label: "At least 1 symbol (@$!%*#?&)",
      test: (pw) => /[@$!%*#?&]/.test(pw),
    },
  ];

  const getPasswordStrength = () => requirements.filter((r) => r.test(password)).length;

  const getStrengthColor = () => {
    const score = getPasswordStrength();
    if (score <= 2) return "#ff4d4d"; 
    if (score <= 4) return "#ffa500";
    return "#00c853"; 
  }

  const validate = () => {
    const newErrors = {};
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernameRegex.test(userName)) {
      newErrors.userName = "Username must be 3–20 characters, letters, numbers, _ or -, no spaces.";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = "Password does not meet all requirements.";
    }

    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const register = async () => {
    if (!validate()) return;
    const result = await context.register(userName, password);
    if (result) {
      navigate("/login");
    } else {
      setErrors({ ...errors, userName: "Username already exists." });
    }
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
          sx={{ mb: 1 }}
          error={!!errors.userName}
          helperText={errors.userName}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 0.5 }}
          error={!!errors.password}
          helperText={errors.password}
        />


        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          sx={{ mb: 3 }}
          error={!!errors.passwordConfirm}
          helperText={errors.passwordConfirm}
        />


        {password && (
          <Box sx={{ mb: 2, textAlign: "left" }}>
            {requirements.map((req) => {
              const passed = req.test(password);
              return (
                <Typography
                  key={req.label}
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: passed ? "#00c853" : "#ff4d4d",
                  }}
                >
                  {passed ? <CheckIcon fontSize="small" /> : <CloseIcon fontSize="small" />}
                  <span style={{ marginLeft: 4 }}>{req.label}</span>
                </Typography>
              );
            })}
          </Box>
        )}

        {password && (
          <Box sx={{ mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={(getPasswordStrength() / requirements.length) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: getStrengthColor(),
                },
              }}
            />
            <Typography variant="caption" sx={{ color: getStrengthColor() }}>
              {getPasswordStrength() <= 2
                ? "Weak"
                : getPasswordStrength() <= 4
                ? "Medium"
                : "Strong"}
            </Typography>
          </Box>
        )}

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
