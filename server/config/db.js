// config/db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

// プール接続を使用（同時接続に強い）
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

export default pool;
