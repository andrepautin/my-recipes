import { Card, CardContent, Paper } from "@mui/material";
import Link from "next/link";
import { recipeImages } from "../images/recipeimages";

export default function RecipeCard({ recipe }) {
  return (
    <Link href={`/recipe/${recipe?.id}`}>
      <Paper
        elevation={24}
        sx={{
          height: 120,
          width: 120,
          m: 1,
          // bgcolor: "#E9D0AA",
          // add hover opacity
          ":hover": { backgroundColor: "#9E691A" },
          backgroundImage: `url('${recipeImages.any}')`,
          backgroundSize: "cover",
        }}
      >
        <CardContent>{recipe?.name}</CardContent>
      </Paper>
    </Link>
  );
}
