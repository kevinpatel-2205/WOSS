import pool from "../config/db.config.js";

export const getAllUsers = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.query("SELECT * FROM user");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};

export const getUserByID = async (req, res) => {
  const { userID } = req.params;
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.query(
      "SELECT * FROM user WHERE userID = ?",
      [userID]
    );
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(results[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};

export const createUser = async (req, res) => {
  const { userName, userEmail, userAge, userPassword } = req.body;
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      "INSERT INTO user (userName, userEmail, userAge, userPassword) VALUES (?, ?, ?, ?)",
      [userName, userEmail, userAge, userPassword]
    );
    res.status(201).json({ message: "User created", userID: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};

export const updateUser = async (req, res) => {
  const { userID } = req.params;
  const { userName, userEmail, userAge, userPassword } = req.body;
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      "UPDATE user SET userName = ?, userEmail = ?, userAge = ?, userPassword = ? WHERE userID = ?",
      [userName, userEmail, userAge, userPassword, userID]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};

export const deleteUser = async (req, res) => {
  const { userID } = req.params;
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      "DELETE FROM user WHERE userID = ?",
      [userID]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};
