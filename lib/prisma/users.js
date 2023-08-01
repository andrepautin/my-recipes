import { ObjectId } from "mongodb";
import prisma from ".";

export async function createUser(user) {
  try {
    console.log("HITTING CREATE");
    const userFromDB = await prisma.user.create({ data: user });
    return { user: userFromDB };
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
