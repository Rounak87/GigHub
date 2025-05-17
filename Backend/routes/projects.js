// routes/projects.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Create new project
router.post('/', async (req, res) => {
  const { client_id, description, budget, status } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO Projects (client_id, description, budget, status) VALUES (?, ?, ?, ?)',
      [client_id, description, budget, status || 'Open']
    );
    res.status(201).json({ message: 'Project created', projectId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all projects (optionally filter by client_id or status via query params)
router.get('/', async (req, res) => {
  const { client_id, status } = req.query;
  let sql = 'SELECT * FROM Projects';
  const params = [];

  if (client_id && status) {
    sql += ' WHERE client_id = ? AND status = ?';
    params.push(client_id, status);
  } else if (client_id) {
    sql += ' WHERE client_id = ?';
    params.push(client_id);
  } else if (status) {
    sql += ' WHERE status = ?';
    params.push(status);
  }

  try {
    const [rows] = await db.execute(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Projects WHERE project_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Project not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  const { client_id, description, budget, status } = req.body;
  try {
    await db.execute(
      'UPDATE Projects SET client_id = ?, description = ?, budget = ?, status = ? WHERE project_id = ?',
      [client_id, description, budget, status, req.params.id]
    );
    res.json({ message: 'Project updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM Projects WHERE project_id = ?', [req.params.id]);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
