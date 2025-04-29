import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Thanks: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      // navigate("/", { replace: true }); // Redirect to the home page
    }, 5000); // Redirect to the home page after 5 seconds
  }, []);

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Paper elevation={3} sx={{ padding: 20 }}>
        <Typography variant="h4">Thank you for registering!</Typography>
        <Typography variant="subtitle1">
          <p>We appreciate your interest in the ServiceNow SDK.</p>
          <p>You will receive an email with more information soon.</p>
        </Typography>
        <Link to="/">
          <Button variant="outlined">Back to Register</Button>
        </Link>
      </Paper>
    </Box>
  );
};
