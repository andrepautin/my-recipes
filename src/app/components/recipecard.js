"use client";

import { Card, CardContent } from "@mui/material";

export default function RecipeCard({ recipe }) {
  return (
    <Card
      sx={{
        height: 120,
        width: 120,
        m: 1,
        bgcolor: "#EAC55E",
      }}
    >
      <CardContent>{recipe?.name}</CardContent>
    </Card>
  );
}
