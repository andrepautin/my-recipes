import { headers } from "next/headers";
import { validateToken } from "../../../../../lib/utils/authUtils";
import { deleteUser } from "../../../../../lib/prisma/users";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const headersList = headers();
    console.log("HEAD DEL--->", headersList);
    const { tokenError } = await validateToken(headersList);
    if (tokenError) throw new Error(tokenError);
    const { userId } = await req.json();
    const { message, error } = await deleteUser(userId);
    if (error) throw new Error(error);
    return NextResponse.json({ message });
  } catch (error) {
    return new NextResponse({ error: error.message });
  }
}
