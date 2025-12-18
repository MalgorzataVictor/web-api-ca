import React, { useContext, useState } from "react";
import { Navigate, useLocation, Link } from "react-router";
import { AuthContext } from "../contexts/authContext";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const LoginPage = () => {
    const context = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const location = useLocation();

    const { from } = location.state
        ? { from: location.state.from.pathname }
        : { from: "/profile" };

 const login = async () => {
  const result = await context.authenticate(userName, password);

  if (!result.success) {
    if (result.msg === "Authentication failed. User not found.") {
      setErrors({ userName: "Username not found" });
    } else if (result.msg === "Wrong password.") {
      setErrors({ password: "Password did not match" });
    } else {
      setErrors({ general: result.msg });
    }
  } else {
    setErrors({});
  }
};

    if (context.isAuthenticated) {
        return <Navigate to={from} />;
    }

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
                    Login
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
                    You must log in to access protected pages
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
                    sx={{ mb: 2 }}
                    error={!!errors.password}
                    helperText={errors.password}
                />

                <Button
                    variant="contained"
                    fullWidth
                    onClick={login}
                    sx={{
                        backgroundColor: "#cc0000",
                        "&:hover": { backgroundColor: "#990000" },
                        mb: 2,
                        py: 1.5,
                        fontWeight: "bold",
                    }}
                >
                    Log In
                </Button>

                <Typography variant="body2">
                    Not registered?{" "}
                    <Link to="/signup" style={{ color: "#cc0000", fontWeight: "bold", textDecoration: "none" }}>
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default LoginPage;
