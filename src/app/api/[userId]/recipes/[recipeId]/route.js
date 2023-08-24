import {
  deleteRecipe,
  getRecipe,
  updateRecipe,
} from "../../../../../../lib/prisma/recipes";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { validateToken } from "../../../../../../lib/utils/authUtils";

export async function GET(req, { params }) {
  try {
    const headersList = headers();
    const { tokenError } = await validateToken(headersList);
    if (tokenError) throw new Error(tokenError);
    const userId = params.userId;
    const recipeId = params.recipeId;
    const { recipe, error } = await getRecipe(userId, recipeId);
    if (error) throw new Error(error);
    return NextResponse.json({ recipe });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req, { params }) {
  try {
    const headersList = headers();
    const { tokenError } = await validateToken(headersList);
    if (tokenError) throw new Error(tokenError);
    const userId = params.userId;
    const recipeId = params.recipeId;
    const { message, error } = await deleteRecipe(userId, recipeId);
    if (error) throw new Error(error);
    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(req, { params }) {
  try {
    const updates = await req.json();
    const headersList = headers();
    const { tokenError } = await validateToken(headersList);
    if (tokenError) throw new Error(tokenError);
    const userId = params.userId;
    const recipeId = params.recipeId;
    const { recipe, error } = await updateRecipe(userId, recipeId, updates);
    if (error) throw new Error(error);
    return NextResponse.json({ recipe });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
