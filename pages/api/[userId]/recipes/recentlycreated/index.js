import { validateToken } from "../../../../../lib/utils/authUtils";

import { getRecentRecipes } from "../../../../../lib/prisma/recipes";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { tokenError } = await validateToken(req);
      if (tokenError) throw new Error(tokenError);
      const userId = req.query.userId;
      const { recipes, error } = await getRecentRecipes(userId);
      if (error) throw new Error(error);
      return res.status(200).json({ recipes });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET"]);
};

export default handler;
