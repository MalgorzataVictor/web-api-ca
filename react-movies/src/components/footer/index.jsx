import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const Footer = () => {
  return (
    <Paper
      component="footer"
      elevation={3}
      sx={{
        mt: 8,
        py: 2,
        backgroundColor: "#cc0000",
        textAlign: "center",
      }}
    >
      <Typography
        variant="body1"
        sx={{ color: "white", fontWeight: "bold" }}
      >
        © {new Date().getFullYear()} Malgorzata Victor
      </Typography>
    </Paper>
  );
};

export default Footer;
