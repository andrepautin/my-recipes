import { createUser, updateUser, deleteUser } from "../../../lib/prisma/users";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { user, error } = await createUser(data);
      if (error) throw new Error(error);
      return res.status(201).json({ user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
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
