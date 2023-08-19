// THIS WILL BE FOR THE ALL RECIPES PAGE IN NAV MENU (GET, POST, PUT, DELETE)
import { headers } from "next/headers";
import { validateToken } from "../../../../../lib/utils/authUtils";
import { NextResponse } from "next/server";
import { addNewRecipe, getAllRecipes } from "../../../../../lib/prisma/recipes";
export async function GET(req, { params }) {
  try {
    const headersList = headers();
    const { tokenError } = await validateToken(headersList);
    if (tokenError) throw new Error(tokenError);
    const userId = params.userId;
    const { recipes, error } = await getAllRecipes(userId);
    if (error) throw new Error(error);
    return NextResponse.json({ recipes });
  } catch (error) {
    console.log("E--->", error);
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req, { params }) {
  try {
    const headersList = headers();
    const newRecipe = await req.json();
    const userId = params.userId;
    newRecipe.userId = userId;
    const { tokenError } = await validateToken(headersList);
    if (tokenError) throw new Error(tokenError);
    const { recipe, error } = await addNewRecipe(newRecipe);
    if (error) throw new Error(error);
    return NextResponse.json({ recipe });
  } catch (error) {
    console.log("E--->", error);
    return NextResponse.json({ error: error.message });
  }
}
