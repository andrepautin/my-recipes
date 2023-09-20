import axios from "axios";
import RecipeCardList from "@/app/components/recipecardlist";
import { cookies } from "next/headers";
import NewRecipeButton from "../components/newrecipebutton";
import { redirect } from "next/navigation";
import { Box, Paper, Typography } from "@mui/material";

async function getRecentRecipes() {
  const nextCookies = cookies();
  let currentUser;
  let token;
  if (nextCookies.get("currentUser") && nextCookies.get("token")) {
    currentUser = JSON.parse(nextCookies.get("currentUser").value);
    token = nextCookies.get("token").value;
  }
  const headers = { authorization: "Bearer " + token };

  try {
    const recipesData = await axios.get(
      `${process.env.BASE_URL}/api/${currentUser?.id}/recipes/recent`,
      { headers }
    );
    const recentlyCreated = recipesData.data.recentlyCreated;
    const recentlyUpdated = recipesData.data.recentlyUpdated;
    return { recentlyCreated, recentlyUpdated };
  } catch (error) {
    console.log("ERR--->", error);
    return { error };
  }
}

export default async function Dashboard() {
  const { recentlyCreated, recentlyUpdated, error } = await getRecentRecipes();
  if (error) {
    console.log("ERROR--->", error);
    redirect("/");
  }
  return (
    <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={24}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          bgcolor: "#F4BF64",
          mt: 3,
          // width: "70%",
          minWidth: "300px",
          maxWidth: "600px",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ textAlign: "center", mb: 2, mt: 2 }}>
            Recently Created Recipes
          </Typography>
          <RecipeCardList recipes={recentlyCreated} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
            Recently Updated Recipes
          </Typography>
          <RecipeCardList recipes={recentlyUpdated} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <NewRecipeButton />
        </Box>
      </Paper>
    </Box>
  );
}
