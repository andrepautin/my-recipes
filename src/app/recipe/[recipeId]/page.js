import IngredientsList from "@/app/components/ingredientslist";
import InstructionsList from "@/app/components/instructionslist";
import TastesList from "@/app/components/tasteslist";
import { Box, Button, Paper, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

async function getRecipe({ recipeId, userId, headers }) {
  const recipeRes = await axios.get(
    `${process.env.BASE_URL}/api/${userId}/recipes/${recipeId}`,
    { headers }
  );
  return { recipe: recipeRes.data.recipe };
}

export default async function RecipeDetail({ params }) {
  const nextCookie = cookies();
  const currentUser = JSON.parse(nextCookie.get("currentUser").value);
  const token = nextCookie.get("token").value;
  const headers = { authorization: "Bearer " + token };
  const { recipe } = await getRecipe({
    recipeId: params?.recipeId,
    userId: currentUser?.id,
    headers: headers,
  });
  let date = recipe?.dateCreated;
  if (date) {
    date = new Date(date).toLocaleDateString();
  }

  console.log("ENV DETAILS--->", process.env.BUCKET_BASE_URL);
  return (
    <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={24}
        sx={{
          bgcolor: "#F4BF64",
          width: "70%",
          minWidth: "300px",
          maxWidth: "600px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">{recipe?.name}</Typography>
          {date && <Typography>Created on: {date}</Typography>}
        </Box>
        <Box sx={{ ml: 2, mb: 2, mt: 2 }}>
          <Typography>Type: {recipe?.type}</Typography>
          <Typography>Time: {recipe?.mealType}</Typography>
          <TastesList tastes={recipe?.tastes} />
        </Box>
        <Box sx={{ ml: 2, mb: 2 }}>
          <IngredientsList ingredients={recipe?.ingredients} />
          <InstructionsList instructions={recipe?.instructions} />
          {recipe?.imgSrc && (
            <Image
              src={
                process.env.BUCKET_BASE_URL + recipe?.id + "-" + recipe?.userId
              }
              alt="AWS image"
              width={200}
              height={150}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Tooltip
            title={
              currentUser?.userName === "demouser1"
                ? "Edit recipe not available in demo mode"
                : "Edit Recipe"
            }
          >
            <Button
              disabled={currentUser?.userName === "demouser1" ? true : false}
              variant="contained"
              sx={{
                width: "150px",
                "&.MuiButton-root": {
                  backgroundColor: "#E2CF21",
                  ":hover": { backgroundColor: "#B7A717" },
                },
                my: 2,
              }}
            >
              <Link href={`/recipe/${recipe?.id}/edit`}>Edit Recipe</Link>
            </Button>
          </Tooltip>
          {/* this will end up being a button link like edit */}
          {/* when delete button clicked, should pop up dialogue to confirm with state and a function should just be called to execute -- NOT OWN PAGE LIKE EDIT */}

          {/* <DeleteRecipe
            userId={currentUser?.id}
            recipeId={recipe?.id}
            currentUser={currentUser}
          /> */}
          <Tooltip
            title={
              currentUser?.userName === "demouser1"
                ? "Delete recipe not available in demo mode"
                : "Delete Recipe"
            }
          >
            <Button
              disabled={currentUser?.userName === "demouser1" ? true : false}
              variant="contained"
              sx={{
                width: "150px",
                "&.MuiButton-root": {
                  bgcolor: "#CD5D4C",
                  ":hover": { bgcolor: "red" },
                },
                my: 2,
              }}
              type="button"
            >
              <Link href={`/recipe/${recipe?.id}/delete`}>Delete Recipe</Link>
            </Button>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );
}
