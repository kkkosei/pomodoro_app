import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const router = express.Router();

// ユーザー登録
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING user_id;
    `;
    const result = await db.query(query, [username, email, hash]);

    res.json({ message: "登録成功", user_id: result.rows[0].user_id });
  } catch (err) {
    console.error("登録エラー:", err);
    res.status(500).json({ error: "登録に失敗しました" });
  }
});

// ログイン
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0)
      return res.status(401).json({ error: "ユーザーが存在しません" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res.status(401).json({ error: "パスワードが違います" });

    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "ログイン成功", token });
  } catch (err) {
    console.error("ログインエラー:", err);
    res.status(500).json({ error: "ログインに失敗しました" });
  }
});

// 認証チェック
router.get("/profile", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "トークンがありません" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "トークンが無効です" });
    res.json({ user });
  });
});

export default router;
