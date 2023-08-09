export default function IngredientsList({ ingredients }) {
  return (
    <div>
      <h1 className="text-xl ml-3">Ingredients</h1>
      <ul className="list-disc ml-10">
        {ingredients.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
