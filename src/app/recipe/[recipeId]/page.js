import IngredientsList from "@/app/components/ingredientslist";
import InstructionsList from "@/app/components/instructionslist";
import TastesList from "@/app/components/tasteslist";
import axios from "axios";
import { cookies } from "next/headers";

async function getRecipe(recipeId) {
  const nextCookie = cookies();
  const currentUser = JSON.parse(nextCookie.get("currentUser").value);
  const token = nextCookie.get("token").value;
  const headers = { authorization: "Bearer " + token };
  const recipeRes = await axios.get(
    `${process.env.BASE_URL}/api/${currentUser?.id}/recipes/${recipeId}`,
    { headers }
  );
  return { recipe: recipeRes.data.recipe };
}

export default async function RecipeDetail({ params }) {
  const { recipe } = await getRecipe(params.recipeId);
  console.log("RECIPE--->", recipe);
  return (
    <div>
      <h1 className="text-5xl mb-5">{recipe?.name}</h1>
      <TastesList tastes={recipe?.tastes} />
      <IngredientsList ingredients={recipe?.ingredients} />
      <InstructionsList instructions={recipe?.instructions} />
    </div>
  );
}
