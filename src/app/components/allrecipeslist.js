export default function AllRecipesList({ recipes }) {
  return (
    <div>
      <ul>
        {recipes?.map((r, index) => (
          <li key={index}>
            {r.name} {r.dateCreated}
          </li>
        ))}
      </ul>
    </div>
  );
}
