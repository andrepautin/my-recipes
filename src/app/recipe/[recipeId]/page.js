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
  return (
    <div>
      <h1 className="text-5xl">{recipe?.name}</h1>
      <div>
        <h1 className="text-xl">Ingredients</h1>
        <ul>
          {recipe?.ingredients?.map((ing) => (
            <li key={ing}>{ing}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
