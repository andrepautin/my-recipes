import DeleteRecipe from "@/app/components/deleterecipe/page";
import IngredientsList from "@/app/components/ingredientslist";
import InstructionsList from "@/app/components/instructionslist";
import TastesList from "@/app/components/tasteslist";
import axios from "axios";
import { cookies } from "next/headers";
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

  return (
    <div>
      <Link href={`/recipe/${recipe?.id}/edit`}>Edit Recipe</Link>
      <h1 className="text-5xl">{recipe?.name}</h1>
      {date && <h1 className="text-xl mb-5">Created on: {date}</h1>}
      <h1>Type: {recipe?.type}</h1>
      <h1>Time: {recipe?.mealType}</h1>
      <TastesList tastes={recipe?.tastes} />
      <IngredientsList ingredients={recipe?.ingredients} />
      <InstructionsList instructions={recipe?.instructions} />
      <DeleteRecipe
        userId={currentUser?.id}
        recipeId={recipe?.id}
        currentUser={currentUser}
      />
    </div>
  );
}
