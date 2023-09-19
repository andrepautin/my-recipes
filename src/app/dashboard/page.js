import axios from "axios";
import RecipeCardList from "@/app/components/recipecardlist";
import { cookies } from "next/headers";
import NewRecipeButton from "../components/newrecipebutton";
import { redirect } from "next/navigation";

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
    <div>
      <div>
        <h1 className="text-center">Recently Created Recipes</h1>
        <RecipeCardList recipes={recentlyCreated} />
      </div>
      <div>
        <h1 className="text-center">Recently Updated Recipes</h1>
        <RecipeCardList recipes={recentlyUpdated} />
      </div>
      <NewRecipeButton />
    </div>
  );
}
