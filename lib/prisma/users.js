import prisma from ".";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { userNameOrEmailExists } from "../utils/authUtils";

export async function loginUser({ userName, password }) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { userName: userName },
    });
    if (!existingUser)
      throw new Error("That username doesn't match any of our records");
    const passwordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordsMatch)
      throw new Error("That username and password combination do not match");
    const accessToken = jwt.sign(existingUser, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });
    delete existingUser.password;
    console.log("HITTING LOGIN");
    return { user: existingUser, token: accessToken };
  } catch (error) {
    return { error };
  }
}

export async function createUser(user) {
  try {
    const recordExists = await userNameOrEmailExists(user);
    if (recordExists === "userName")
      throw new Error("That username already exists");
    if (recordExists === "email") throw new Error("That email already exists");
    user.password = await bcrypt.hash(user.password, 10);
    const userFromDB = await prisma.user.create({ data: user });
    const accessToken = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });
    delete userFromDB.password;
    return { user: userFromDB, token: accessToken };
  } catch (error) {
    return { error };
  }
}

export async function updateUser(userId, updates) {
  const { email, firstName, lastName } = updates;
  let updateData = {};
  if (email) updateData.email = email;
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  try {
    const userFromDB = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}

export async function deleteUser(userId) {
  try {
    const userFromDB = await prisma.user.delete({
      where: { id: userId },
    });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}
