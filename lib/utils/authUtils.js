import prisma from "../prisma";
const jwt = require("jsonwebtoken");

export async function userNameOrEmailExists({ userName, email }) {
  const existingUsername = await prisma.user.findUnique({
    where: {
      userName: userName,
    },
  });
  if (existingUsername) return "userName";
  const existingEmail = await prisma.user.findUnique({
    where: { email: email },
  });
  if (existingEmail) return "email";
  return false;
}

export async function validateToken(req) {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader && authHeader.split(" ")[1];
  try {
    if (!authHeader || !token) throw new Error("TOKEN REQUIRED");
    const user = jwt.verify(token, process.env.SECRET_KEY);
    return { valid: user };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      error.message = "TOKEN EXPIRED";
    }
    return { tokenError: error };
  }
}
