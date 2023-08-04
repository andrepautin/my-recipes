import axios from "axios";
import RecipeCardList from "@/app/components/recipecardlist";
import { cookies } from "next/headers";

async function getRecentRecipes() {
  const nextCookies = cookies();
  const currentUser = JSON.parse(nextCookies.get("currentUser").value);
  const token = nextCookies.get("token").value;
  const headers = { authorization: "Bearer " + token };

  try {
    const createdRes = await axios.get(
      `${process.env.BASE_URL}/api/${currentUser?.id}/recipes/recentlycreated`,
      { headers }
    );
    const updatedRes = await axios.get(
      `${process.env.BASE_URL}/api/${currentUser?.id}/recipes/recentlyupdated`,
      { headers }
    );
    const created = createdRes.data.recipes;
    const updated = updatedRes.data.recipes;
    return { created, updated };
  } catch (error) {
    console.log("ERR--->", error);
  }
}

export default async function Dashboard() {
  const { created, updated, error } = await getRecentRecipes();
  return (
    <div>
      <div>
        <h1 className="text-center">Recently Created Recipes</h1>
        <RecipeCardList recipes={created} />
      </div>
      <div>
        <h1 className="text-center">Recently Updated Recipes</h1>
        <RecipeCardList recipes={updated} />
      </div>
    </div>
  );
}
