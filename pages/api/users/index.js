import {
  loginUser,
  createUser,
  updateUser,
  deleteUser,
} from "../../../lib/prisma/users";

import { validateToken } from "../../../lib/utils/authUtils";

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log("HITTING POST");
    try {
      const data = req.body;
      if (data.email) {
        const { user, token, error } = await createUser(data);
        if (error) throw new Error(error);
        return res.status(201).json({ user, token });
      }

      const { user, token, error } = await loginUser(data);
      if (error) throw new Error(error);
      return res.status(201).json({ user, token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const { tokenError } = await validateToken(req);
      if (tokenError) throw new Error(tokenError);
      const { userId, updates } = req.body;
      const { user, error } = await updateUser(userId, updates);
      if (error) throw new Error(error);
      return res.status(201).json({ user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { tokenError } = await validateToken(req);
      if (tokenError) throw new Error(tokenError);
      const userId = req.body.userId;
      const { user, error } = await deleteUser(userId);
      if (error) throw new Error(error);
      return res.status(201).json({ user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
};

export default handler;
