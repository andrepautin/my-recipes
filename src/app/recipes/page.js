import { cookies } from "next/headers";
import axios from "axios";

async function getAllRecipes() {
  const nextCookies = cookies();
  const currentUser = JSON.parse(nextCookies.get("currentUser").value);
  const token = nextCookies.get("token").value;
  const headers = { authorization: "Bearer " + token };

  try {
    const recipesData = await axios.get(
      `${process.env.BASE_URL}/api/${currentUser?.id}/recipes`,
      { headers }
    );
    const recipes = recipesData?.data?.recipes;
    return { recipes };
  } catch (error) {
    console.log("ERR--->", error);
    return { error };
  }
}

export default async function Recipes() {
  const { recipes } = await getAllRecipes();
  return (
    // SHOULD RENDER A CONTAINER THAT RENDERS LIST OF RECIPES
    // USER SHOULD BE ABLE TO FILTER BY TYPE (FOOD, DRINK),
    // MEAL TYPE (BFAST, LUNCH, DINNER, SNACK) AND SEARCH BY NAME
    // SHOULD BE ABLE TO DElETE FROM THIS COMP AS WELL
    // IF ITEM CLICKED, SHOULD GO TO DETAIL PAGE FOR THAT RECIPE (INDEX WILL BE PART OF INDIVIDUAL COMP)
    <div>
      <ul className="list-disc">
        {recipes?.map((r) => (
          <li key={r}>{r?.name}</li>
        ))}
      </ul>
    </div>
  );
}
