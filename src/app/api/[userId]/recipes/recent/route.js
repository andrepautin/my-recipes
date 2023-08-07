import { NextResponse } from "next/server";
import { validateToken } from "../../../../../../lib/utils/authUtils";
import {
  getRecentRecipes,
  getRecentUpdatedRecipes,
} from "../../../../../../lib/prisma/recipes";
import { headers } from "next/headers";
export async function GET(req, { params }) {
  try {
    const headersList = headers();
    const { tokenError } = await validateToken(headersList);
    if (tokenError) throw new Error(tokenError);
    const userId = params.userId;
    const { recentlyCreated, createdError } = await getRecentRecipes(userId);
    const { recentlyUpdated, updatedError } = await getRecentUpdatedRecipes(
      userId
    );
    if (createdError || updatedError) throw new Error(error);
    return NextResponse.json({ recentlyCreated, recentlyUpdated });
  } catch (error) {
    console.log("E--->", error);
    return NextResponse.json({ error: error.message });
  }
}
