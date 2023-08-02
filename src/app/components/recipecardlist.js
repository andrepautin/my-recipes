"use client";

import RecipeCard from "./recipecard";

export default function RecipeCardList({ recipes }) {
  return (
    <div className="flex justify-center">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
