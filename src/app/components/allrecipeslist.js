import Link from "next/link";
export default function AllRecipesList({ recipes }) {
  return (
    <div>
      <ul>
        {recipes?.map((r, index) => (
          <li key={index}>
            <Link href={`/recipe/${r.id}`}>{r.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
