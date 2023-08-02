import { validateToken } from "../../../../../lib/utils/authUtils";
import {
  getRecipe,
  updateRecipe,
  deleteRecipe,
} from "../../../../../lib/prisma/recipes";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { tokenError } = await validateToken(req);
      if (tokenError) throw new Error(tokenError);
      const userId = req.query.userId;
      const recipeId = req.query.recipeId;
      const { recipe, error } = await getRecipe(userId, recipeId);
      if (error) throw new Error(error);
      return res.status(200).json({ recipe });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const { tokenError } = await validateToken(req);
      if (tokenError) throw new Error(tokenError);
      const userId = req.query.userId;
      const recipeId = req.query.recipeId;
      const updates = req.body;
      const { recipe, error } = await updateRecipe(userId, recipeId, updates);
      if (error) throw new Error(error);
      return res.status(200).json({ recipe });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { tokenError } = await validateToken(req);
      if (tokenError) throw new Error(tokenError);
      const userId = req.query.userId;
      const recipeId = req.query.recipeId;
      const { message, error } = await deleteRecipe(userId, recipeId);
      if (error) throw new Error(error);
      return res.status(200).json({ message });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
};

export default handler;
