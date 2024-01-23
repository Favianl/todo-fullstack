import jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from '../config.js';

export const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'unauthorized' });

    jwt.verify(token, SECRET_TOKEN, (err, data) => {
      if (err) return res.status(401).json({ message: 'invalid token' });

      req.userId = data.id;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: 'failed' });
  }
};
