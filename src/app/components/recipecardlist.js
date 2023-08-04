"use client";

import RecipeCard from "./recipecard";

export default function RecipeCardList({ recipes }) {
  return (
    <div className="flex justify-center">
      {recipes.length < 1 ? (
        <h1>No recipes to show</h1>
      ) : (
        recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)
      )}
    </div>
  );
}
