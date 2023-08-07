import { Card, CardContent } from "@mui/material";
import Link from "next/link";

export default function RecipeCard({ recipe }) {
  return (
    <Link href={`/recipe/${recipe?.id}`}>
      <Card
        sx={{
          height: 120,
          width: 120,
          m: 1,
          bgcolor: "#EAC55E",
        }}
      >
        <CardContent>{recipe?.name}</CardContent>
      </Card>
    </Link>
  );
}
