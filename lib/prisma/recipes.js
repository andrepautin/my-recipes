import prisma from ".";

export async function getAllRecipes(userId) {
  try {
    const recipes = await prisma.recipe.findMany({
      where: { userId: userId },
    });
    return { recipes };
  } catch (error) {
    return { error };
  }
}

export async function getRecipe(userId, recipeId) {
  try {
    const recipe = await prisma.recipe.findFirst({
      where: { userId: userId, id: recipeId },
    });
    return { recipe };
  } catch (error) {
    return { error };
  }
}

export async function getRecentRecipes(userId) {
  try {
    const recentlyCreated = await prisma.recipe.findMany({
      take: 3,
      where: { userId: userId },
      orderBy: {
        dateCreated: "desc",
      },
    });
    return { recentlyCreated };
  } catch (error) {
    return { createdError: error };
  }
}

export async function getRecentUpdatedRecipes(userId) {
  try {
    const recentlyUpdated = await prisma.recipe.findMany({
      take: 3,
      where: { userId: userId },
      orderBy: {
        dateUpdated: "desc",
      },
    });
    return { recentlyUpdated };
  } catch (error) {
    return { updatedError: error };
  }
}

export async function addNewRecipe(newRecipe) {
  try {
    const addedRecipe = await prisma.recipe.create({ data: newRecipe });
    return { recipe: addedRecipe };
  } catch (error) {
    return { error };
  }
}

export async function updateRecipe(userId, recipeId, updates) {
  const { name, ingredients, instructions, tastes, type, mealType } = updates;
  let updateData = {};
  if (name) updateData.name = name;
  if (ingredients) updateData.name = ingredients;
  if (instructions) updateData.instructions = instructions;
  if (tastes) updateData.tastes = tastes;
  if (type) updateData.type = type;
  if (mealType) updateData.mealType = mealType;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  updateData.dateUpdated = today.toISOString();
  try {
    const recipe = await prisma.recipe.update({
      where: { userId: userId, id: recipeId },
      data: updateData,
    });
    return { recipe };
  } catch (error) {
    return { error };
  }
}

export async function deleteRecipe(userId, recipeId) {
  try {
    const deletedRecipe = await prisma.recipe.delete({
      where: { userId: userId, id: recipeId },
    });
    return { message: `Deleted recipe for ${deletedRecipe.name}` };
  } catch (error) {
    return { error };
  }
}
