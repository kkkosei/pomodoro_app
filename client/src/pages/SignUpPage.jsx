import React, { useState } from "react";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("登録成功！ログインしてください。");
        window.location.href = "/signin"; // 登録後にSign inへ
      } else {
        alert(data.error || "登録に失敗しました。");
      }
    } catch (error) {
      console.error("登録エラー:", error);
      alert("サーバーに接続できませんでした。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>
          Username
          <input
            type="text"
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            
          />
        </label>
        <label >
          Email
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label >
          Password
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "送信中..." : "Sign Up"}
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        すでにアカウントをお持ちですか？{" "}
        <a href="/login">Sign inはこちら</a>
      </p>
    </div>
  );
}

export default SignUpPage;
