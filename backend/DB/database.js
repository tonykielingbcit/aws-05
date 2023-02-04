import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config()

const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
  })
  .promise()


export async function createUser({email, password, displayName, profileImage}) {
  const [result] = await pool.query(
    `INSERT INTO users (email, password, displayName, profileImage) VALUES (?, ?, ?, ?)`,
    [email, password, displayName, profileImage]
  );

  return result;
}


export async function getUserById(userId) {
  const [result] = await pool.query(
    `SELECT * FROM users WHERE id = ?`,
    [userId]
  );

  return result[0];
}


export async function getUserWithEmail(email) {
  const [result] = await pool.query(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  return result[0];
}


export async function updateUserDisplayName(id, newDisplayName) {
  const [result] = await pool.query(
    `UPDATE users SET displayName = ? WHERE id = ?`,
    [newDisplayName, id]
  );
  
  return result;
}


export async function updateUserProfileImage(id, newProfileImage) {
  const [result] = await pool.query(
    `UPDATE users SET profileImage = ? WHERE id = ?`,
    [newProfileImage, id]
  );

  return result;
}
