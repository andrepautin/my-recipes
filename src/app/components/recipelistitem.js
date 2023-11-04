"use client";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { useState, useContext } from "react";
import { currentUserContext } from "../context/userContext";
import DeleteRecipe from "./deleterecipe/page";

export default function RecipeListItem({ recipe }) {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const [deleteClicked, setDeleteClicked] = useState(false);
  return (
    // grid style with name, date created, last updated, type and mealtype columns
    // add edit and delete icons
    // edit should link to edit page and pass recipe id
    // delete should pop up dialogue
    // will have to use context for currentUser because userName is needed when rendering deleteUser
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Link href={`/recipe/${recipe.id}`} style={{ width: "70%" }}>
        {recipe?.name}
      </Link>
      <Box>
        <IconButton>
          <Link href={`/recipe/${recipe?.id}/edit`}>
            <Edit />
          </Link>
        </IconButton>
        {/* delete functionality to be moved and link like edit */}
        {/* <IconButton>
          <Delete>
            <DeleteRecipe
              userId={currentUser?.id}
              recipeId={recipe?.id}
              currentUser={currentUser}
            />
          </Delete>
        </IconButton> */}
      </Box>
    </Box>
  );
}
