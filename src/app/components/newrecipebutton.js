"use client";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import styled from "@emotion/styled";

export default function NewRecipeButton() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant="contained"
        sx={{
          "&.MuiButtonBase-root": {
            bgcolor: "#6A9B6B",
          },
          "&.MuiButtonBase-root:hover": {
            bgcolor: "green",
          },
        }}
      >
        <Link href="/newrecipe">Add New Recipe</Link>
      </Button>
    </Box>
  );
}
