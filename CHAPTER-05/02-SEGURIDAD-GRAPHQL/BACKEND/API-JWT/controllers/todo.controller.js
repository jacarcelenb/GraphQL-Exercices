const { db } = require("../config/cnn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const TodoResolver = {
  Query: {
    tasks: async (_, __, { userId }) => {
      if (!userId) throw new Error("Not authenticated");
      const res = await db.any("SELECT * FROM tasks WHERE userId = $1", [
        userId,
      ]);
      return res;
    },
    task: async (_, { id }, { userId }) => {
      if (!userId) throw new Error("Not authenticated");
      const res = await db.one(
        "SELECT * FROM tasks WHERE id = $1 AND userId = $2",
        [id, userId]
      );
      return res;
    },
  },
  Mutation: {
    register: async (root, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const res = await db.one(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
        [username, email, hashedPassword]
      );
      const token = jwt.sign({ userId: res.id }, process.env.JWTSECRET, {
        expiresIn: "1h",
      });
      return token;
    },
    login: async (root, { username, password }) => {
      const res = await db.any("SELECT * FROM users WHERE username = $1", [
        username,
      ]);
      const user = res;

      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user[0].password);
      if (!valid) throw new Error("Invalid password");
      const token = jwt.sign({ userId: user[0].id }, process.env.JWTSECRET, {
        expiresIn: "1h",
      });
      return token;
    },
    addTask: async (root, { task }, { userId }) => {
      console.log("addTask", { task });
      if (!userId) throw new Error("Not authenticated");
      const res = await db.one(
        "INSERT INTO tasks (title, description, userId , date , status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [task.title, task.description, userId, task.date, task.status]
      );
      return res;
    },
    updateTask: async (root, { task }, { userId }) => {
      if (!userId) throw new Error("Not authenticated");
      const res = await db.one(
        "UPDATE tasks SET title = $1, description = $2 , status=$3 WHERE id = $4 AND userId = $5 RETURNING *",
        [task.title, task.description, task.status, task.id, userId]
      );
      return res;
    },
    deleteTask: async (root, { id }, { userId }) => {
      if (!userId) throw new Error("Not authenticated");
      await db.none("DELETE FROM tasks WHERE id = $1 AND userId = $2", [
        id,
        userId,
      ]);
      return true;
    },
  },
};

module.exports = TodoResolver;
