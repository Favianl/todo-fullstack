import { pool } from '../database/db.js';

export const test = async (req, res) => {
  try {
    // const [data] = await pool.query('SELECT * FROM tasks');
    const [data] = await pool.query('SELECT * FROM users');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Unknown error' });
  }
};
