"use client";

import { Box, Paper } from "@mui/material";
import RecipeCard from "./recipecard/recipecard";

export default function RecipeCardList({ recipes }) {
  return (
    // set min and max width
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {recipes?.length < 1 ? (
        <h1>No recipes to show</h1>
      ) : (
        recipes?.map((r) => <RecipeCard key={r.id} recipe={r} />)
      )}
    </Box>
  );
}
