"use client";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function NewRecipeButton() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button sx={{ ":hover": { color: "white" } }}>
        <Link href="/newrecipe">Add New Recipe</Link>
      </Button>
    </Box>
  );
}
