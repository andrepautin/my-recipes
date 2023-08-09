import axios from "axios";
import RecipeCardList from "@/app/components/recipecardlist";
import { cookies } from "next/headers";

async function getRecentRecipes() {
  const nextCookies = cookies();
  const currentUser = JSON.parse(nextCookies.get("currentUser").value);
  const token = nextCookies.get("token").value;
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
  return (
    // BUTTON AT BOTTOM THAT LINKS TO ADD NEW RECIPE FORM
    <div>
      <div>
        <h1 className="text-center">Recently Created Recipes</h1>
        <RecipeCardList recipes={recentlyCreated} />
      </div>
      <div>
        <h1 className="text-center">Recently Updated Recipes</h1>
        <RecipeCardList recipes={recentlyUpdated} />
      </div>
    </div>
  );
}
