// routes/tasks.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Create a new task (assign to freelancer)
router.post('/', async (req, res) => {
  const { project_id, freelancer_id, deadline, status } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO Tasks (project_id, freelancer_id, deadline, status) VALUES (?, ?, ?, ?)',
      [project_id, freelancer_id, deadline, status || 'Assigned']
    );
    res.status(201).json({ message: 'Task assigned', taskId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks (optional filters: project_id, freelancer_id)
router.get('/', async (req, res) => {
  const { project_id, freelancer_id } = req.query;
  let sql = 'SELECT * FROM Tasks';
  const params = [];

  if (project_id && freelancer_id) {
    sql += ' WHERE project_id = ? AND freelancer_id = ?';
    params.push(project_id, freelancer_id);
  } else if (project_id) {
    sql += ' WHERE project_id = ?';
    params.push(project_id);
  } else if (freelancer_id) {
    sql += ' WHERE freelancer_id = ?';
    params.push(freelancer_id);
  }

  try {
    const [rows] = await db.execute(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get task by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Tasks WHERE task_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Task not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task (e.g., update status or deadline)
router.put('/:id', async (req, res) => {
  const { project_id, freelancer_id, deadline, status } = req.body;
  try {
    await db.execute(
      'UPDATE Tasks SET project_id = ?, freelancer_id = ?, deadline = ?, status = ? WHERE task_id = ?',
      [project_id, freelancer_id, deadline, status, req.params.id]
    );
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM Tasks WHERE task_id = ?', [req.params.id]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
