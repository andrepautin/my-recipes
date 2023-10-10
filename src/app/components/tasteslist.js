import { Box, Typography } from "@mui/material";

export default function TastesList({ tastes }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography>{"Tastes:"}</Typography>
      {tastes.map((t, index) => (
        <Typography key={t}>
          &nbsp;
          {t + `${index !== tastes.length - 1 ? `${","}` : `${""}`}`}
        </Typography>
      ))}
    </Box>
  );
}
