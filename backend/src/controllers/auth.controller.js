import { SECRET_TOKEN } from '../config.js';
import { pool } from '../database/db.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [data] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password],
    );
    if (data.affectedRows > 0) {
      res.status(201).json({
        message: 'Registration Successful',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Unknown register error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [data] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      email,
    );
    if (data.length > 0) {
      if (data[0].password === password) {
        const userData = {
          ...data[0],
        };
        delete userData.password;

        const token = jwt.sign(
          userData,
          SECRET_TOKEN,
          {
            expiresIn: '1d',
          },
          (error, token) => {
            if (error) console.log(error);

            res.cookie('token', token);
            res.status(200).json(userData);
          },
        );
      } else {
        res.status(400).json({ message: 'invalid credentials' });
      }
    } else {
      res.status(400).json({ message: 'invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Unknown login error' });
  }
};

export const tokenValidation = (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'unauthorized' });

  jwt.verify(token, SECRET_TOKEN, (err, data) => {
    if (err) return res.status(401).json({ message: 'invalid' });

    const { id, name, email } = data;

    res.status(200).json({ id, name, email });
  });
};
