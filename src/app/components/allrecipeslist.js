import { Box, List, ListItem } from "@mui/material";
import Link from "next/link";
import RecipeListItem from "./recipelistitem";
export default function AllRecipesList({ recipes }) {
  return (
    // elevated look with white background, should be able to add a new recipe at the top
    // show other details (name, date created, last updated, type, mealtype) columns
    <Box>
      <List>
        {recipes?.map((recipe, index) => (
          <ListItem key={index}>
            <RecipeListItem recipe={recipe} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
