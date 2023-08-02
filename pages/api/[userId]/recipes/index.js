import { validateToken } from "../../../../lib/utils/authUtils";
import { getAllRecipes, addNewRecipe } from "../../../../lib/prisma/recipes";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { tokenError } = await validateToken(req);
      if (tokenError) throw new Error(tokenError);
      const userId = req.query.userId;
      const { recipes, error } = await getAllRecipes(userId);
      if (error) throw new Error(error);
      return res.status(200).json({ recipes });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { tokenError } = await validateToken(req);
      if (tokenError) throw new Error(tokenError);
      const newRecipe = req.body;
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      newRecipe.dateCreated = today.toISOString();
      const { recipe, error } = await addNewRecipe(newRecipe);
      if (error) throw new Error(error);
      return res.status(201).json({ recipe });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
};

export default handler;
