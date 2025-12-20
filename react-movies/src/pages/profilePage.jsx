import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router";
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  TextField,
  LinearProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const ProfilePage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(null);
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});

  const requirements = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "At least 1 uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "At least 1 lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "At least 1 number", test: (pw) => /\d/.test(pw) },
    { label: "At least 1 symbol (@$!%*#?&)", test: (pw) => /[@$!%*#?&]/.test(pw) },
  ];

  const getPasswordStrength = () => requirements.filter((r) => r.test(password)).length;
  const getStrengthColor = () => {
    const score = getPasswordStrength();
    if (score <= 2) return "#ff4d4d";
    if (score <= 4) return "#ffa500";
    return "#00c853";
  };

  const validate = () => {
    const newErrors = {};
    if (showUsernameForm) {
      const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
      if (!usernameRegex.test(userName)) {
        newErrors.userName = "Username must be 3–20 characters, letters, numbers, _ or -, no spaces.";
      }
    }
    if (showPasswordForm) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
      if (!passwordRegex.test(password)) newErrors.password = "Password does not meet all requirements.";
      if (password !== passwordConfirm) newErrors.passwordConfirm = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateProfile = () => {
    if (!validate()) return;
    if (showUsernameForm) context.updateUsername(userName);
    if (showPasswordForm) context.updatePassword(password);
    setUserName("");
    setPassword("");
    setPasswordConfirm("");
    setShowUsernameForm(false);
    setShowPasswordForm(false);
  };

  const handleAvatarUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#f5f5f5",
        py: 4,
        px: 2,
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
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {context.isAuthenticated ? (
          <>
            <Box>
              <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold", color: "#cc0000" }}>
                Profile
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: "#555" }}>
                Welcome, <strong>{context.userName}</strong>!
              </Typography>
            </Box>

           
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <Avatar
                src={avatar || "/default-avatar.png"}
                sx={{ width: 100, height: 100 }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#115293" } }}
                >
                  Upload Avatar
                  <input type="file" hidden accept="image/*" onChange={handleAvatarUpload} />
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setAvatar(null)}
                >
                  Delete Avatar
                </Button>
              </Box>
            </Box>

          
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setShowUsernameForm((prev) => !prev)}
              >
                Update Username
              </Button>
              <Button
                variant="outlined"
                onClick={() => setShowPasswordForm((prev) => !prev)}
              >
                Update Password
              </Button>
            </Box>

           
            {showUsernameForm && (
              <Box sx={{ textAlign: "left", mt: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Update Username
                </Typography>
                <TextField
                  label="New Username"
                  variant="outlined"
                  fullWidth
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  error={!!errors.userName}
                  helperText={errors.userName}
                />
              </Box>
            )}

            
            {showPasswordForm && (
              <Box sx={{ textAlign: "left", mt: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Update Password
                </Typography>
                <TextField
                  label="New Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 1 }}
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
                  sx={{ mb: 1 }}
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
                  <LinearProgress
                    variant="determinate"
                    value={(getPasswordStrength() / requirements.length) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#e0e0e0",
                      mb: 2,
                      "& .MuiLinearProgress-bar": { backgroundColor: getStrengthColor() },
                    }}
                  />
                )}
              </Box>
            )}

          
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#00c853", "&:hover": { backgroundColor: "#009624" }, flex: 1, py: 1.5 }}
                onClick={updateProfile}
              >
                Save Changes
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#d32f2f", "&:hover": { backgroundColor: "#9a0007" }, flex: 1, py: 1.5 }}
                onClick={() => context.signout()}
              >
                Sign Out
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#cc0000" }}>
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
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ProfilePage;
