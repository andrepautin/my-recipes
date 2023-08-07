import {
  loginUser,
  createUser,
  updateUser,
  deleteUser,
} from "../../../../lib/prisma/users";

import { validateToken } from "../../../../lib/utils/authUtils";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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

// export const handler = async (req, res) => {

//   if (req.method === "PUT") {
//     try {
//       const { tokenError } = await validateToken(req);
//       if (tokenError) throw new Error(tokenError);
//       const { userId, updates } = req.body;
//       const { user, error } = await updateUser(userId, updates);
//       if (error) throw new Error(error);
//       return res.status(201).json({ user });
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }

//   if (req.method === "DELETE") {
//     try {
//       const { tokenError } = await validateToken(req);
//       if (tokenError) throw new Error(tokenError);
//       const userId = req.body.userId;
//       const { message, error } = await deleteUser(userId);
//       if (error) throw new Error(error);
//       return res.status(201).json({ message });
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }

//   res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
// };

// export default handler;
