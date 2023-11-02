import { Box } from "@mui/material";
import Link from "next/link";

export default function RecipeListItem({ recipe }) {
  return (
    // should be able to edit and delete individual recipes
    // grid style with name, date created, last updated, type and mealtype columns
    <Box>
      <Link href={`/recipe/${recipe.id}`}>{recipe.name}</Link>
    </Box>
  );
}
