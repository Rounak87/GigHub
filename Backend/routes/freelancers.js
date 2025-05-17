// routes/freelancers.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Create a new freelancer
router.post('/', async (req, res) => {
  const { name, skills, rating } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO Freelancers (name, skills, rating) VALUES (?, ?, ?)',
      [name, skills, rating || 0.0]
    );
    res.status(201).json({ message: 'Freelancer created', freelancerId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all freelancers
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Freelancers');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get freelancer by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Freelancers WHERE freelancer_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Freelancer not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update freelancer
router.put('/:id', async (req, res) => {
  const { name, skills, rating } = req.body;
  try {
    await db.execute(
      'UPDATE Freelancers SET name = ?, skills = ?, rating = ? WHERE freelancer_id = ?',
      [name, skills, rating, req.params.id]
    );
    res.json({ message: 'Freelancer updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete freelancer
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM Freelancers WHERE freelancer_id = ?', [req.params.id]);
    res.json({ message: 'Freelancer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
