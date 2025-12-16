import express from "express";
import { supabase } from "../config/supabase.js";

const router = express.Router();

// ユーザー登録
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { username },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "登録成功", user: data.user });
  } catch (err) {
    res.status(500).json({ error: "登録エラー" });
  }
});

// ログイン
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: "ログイン失敗" });
    }

    // セッションにユーザー情報を保存
    req.session.user = {
      id: data.user.id,
      email: data.user.email,
      username: data.user.user_metadata?.username,
    };

    res.json({ message: "ログイン成功", user: data.user });
  } catch (err) {
    res.status(500).json({ error: "ログインエラー" });
  }
});

// プロフィール取得
router.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "認証が必要です" });
  }
  res.json({ user: req.session.user });
});

// ログアウト
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "ログアウト失敗" });
    res.clearCookie("connect.sid");
    res.json({ message: "ログアウト成功" });
  });
});

export default router;
