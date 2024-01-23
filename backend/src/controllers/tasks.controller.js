import { pool } from '../database/db.js';

export const getTasks = async (req, res) => {
  try {
    const [data] = await pool.query(
      'SELECT * FROM tasks WHERE user_id = ?',
      req.userId,
    );
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Unknown error' });
  }
};

export const getTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (isNaN(taskId)) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const [data] = await pool.query(
      'SELECT * FROM tasks WHERE user_id = ? AND id = ? ',
      [req.userId, taskId],
    );

    if (req.fromCreateTask) {
      return data[0];
    } else {
      res.json(data[0]);
    }
  } catch (error) {
    res.status(500).json({ message: 'Unknown error' });
  }
};

export const createTask = async (req, res) => {
  const { description } = req.body;
  const userId = req.userId;

  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (description, user_id) VALUES (?, ?)',
      [description, userId],
    );

    if (result.affectedRows > 0) {
      const task = await getTask({
        params: { id: result.insertId },
        userId,
        fromCreateTask: true,
      });

      res.json(task);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Unknown error' });
  }
};

export const updateTask = async (req, res) => {
  const { description } = req.body;
  const userId = req.userId;
  const taskId = req.params.id;

  try {
    const [result] = await pool.query(
      'UPDATE tasks SET description  = ? WHERE id = ? AND user_id  = ?',
      [description, taskId, userId],
    );

    if (result.affectedRows > 0) {
      res.json({ id: parseInt(taskId), description });
    } else {
      res.status(500).json({ message: 'Unknown error' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Unknown error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const [deleteRes] = await pool.query(
      'DELETE FROM tasks WHERE id = ?',
      taskId,
    );

    if (deleteRes.affectedRows > 0) {
      res.status(200).json({ message: 'task was deleted' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Unknown error' });
  }
};
