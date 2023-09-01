import { Box, LinearProgress, Typography } from "@mui/material";

export default function CustomLoading({ message }) {
  return (
    <Box sx={{ my: "auto" }}>
      <Typography>Loading {message && message}...</Typography>
      <LinearProgress />
    </Box>
  );
}
