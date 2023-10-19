"use client";
import { Card, CardContent, Paper, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import { recipeImages } from "../images/recipeimages";
import Image from "next/image";
// create dev and prod buckets
const BUCKET_BASE_URL = "https://my-recipes-images.s3.us-west-1.amazonaws.com/";
export default function RecipeCard({ recipe }) {
  return (
    <Link href={`/recipe/${recipe?.id}`}>
      <Tooltip title={recipe?.name}>
        <Typography
          sx={{
            maxWidth: 120,
            whiteSpace: "nowrap",
            overflow: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            "&-ms-overflow-style": { display: "none" },
            ml: 1,
          }}
        >
          {recipe?.name}
        </Typography>
        <Paper
          elevation={24}
          sx={{
            height: 120,
            width: 120,
            m: 1,
            mt: 0,
            ":hover": { opacity: 0.5 },
            backgroundImage: recipe?.imgSrc
              ? `url('${BUCKET_BASE_URL + recipe?.id + "-" + recipe?.userId}')`
              : `url('${
                  recipe?.mealType === "any"
                    ? recipeImages?.any
                    : recipeImages[recipe?.mealType][recipe?.type]
                }')`,
            backgroundSize: "cover",
          }}
        ></Paper>
      </Tooltip>
    </Link>
  );
}
