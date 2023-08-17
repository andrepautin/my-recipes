import {
  loginUser,
  createUser,
  updateUser,
  deleteUser,
} from "../../../../lib/prisma/users";

import { validateToken } from "../../../../lib/utils/authUtils";

import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function POST(req) {
  try {
    const data = await req.json();
    if (data.email) {
      const { user, token, error } = await createUser(data);
      if (error) throw new Error(error);
      cookies().set("currentUser", JSON.stringify(user));
      cookies().set("token", token);
      return NextResponse.json({ user, token });
    }

    const { user, token, error } = await loginUser(data);
    if (error) throw new Error(error);
    cookies().set("currentUser", JSON.stringify(user));
    cookies().set("token", token);
    return NextResponse.json({ user, token });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(req) {
  try {
    const headersList = headers();
    const { tokenError } = await validateToken(headersList);
    if (tokenError) throw new Error(tokenError);
    const { userId, updates } = await req.json();
    const { user, error } = await updateUser(userId, updates);
    if (error) throw new Error(error);
    cookies().set("currentUser", JSON.stringify(user));
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse({ error: error.message });
  }
}

// export async function DELETE(req) {
//   try {
//     // console.log("REQ--->", await req.json());
//     console.log(req);
//     const headersList = headers();
//     console.log("HEAD DEL--->", headersList);
//     const { tokenError } = await validateToken(headersList);
//     if (tokenError) throw new Error(tokenError);
//     const { userId } = await req.json();
//     const { message, error } = await deleteUser(userId);
//     if (error) throw new Error(error);
//     return NextResponse.json({ message });
//   } catch (error) {
//     return new NextResponse({ error: error.message });
//   }
// }
