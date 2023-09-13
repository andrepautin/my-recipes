import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function NewRecipeButton() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button>
        <Link href="/newrecipe">Add New Recipe</Link>
      </Button>
    </Box>
  );
}
