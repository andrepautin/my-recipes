import { Card, CardActionArea, CardContent } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function RecipeCard({ recipe }) {
  // const router = useRouter();
  // const handleClick = (evt) => {
  //   evt.preventDefault();
  //   router.push({
  //     pathname: `/recipe/${recipe?.id}`,
  //   });
  // };
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
