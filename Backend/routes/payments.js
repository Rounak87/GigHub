// routes/payments.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Create a new payment
router.post('/', async (req, res) => {
  const { task_id, amount, payment_status } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO Payments (task_id, amount, payment_status) VALUES (?, ?, ?)',
      [task_id || null, amount || null, payment_status || 'Pending']
    );
    res.status(201).json({ message: 'Payment recorded', paymentId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all payments (optionally filter by task_id or payment_status)
router.get('/', async (req, res) => {
  const { task_id, payment_status } = req.query;
  let sql = 'SELECT * FROM Payments';
  const params = [];

  if (task_id && payment_status) {
    sql += ' WHERE task_id = ? AND payment_status = ?';
    params.push(task_id, payment_status);
  } else if (task_id) {
    sql += ' WHERE task_id = ?';
    params.push(task_id);
  } else if (payment_status) {
    sql += ' WHERE payment_status = ?';
    params.push(payment_status);
  }

  try {
    const [rows] = await db.execute(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get payment by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Payments WHERE payment_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Payment not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a payment
router.put('/:id', async (req, res) => {
  const { task_id, amount, payment_status } = req.body;
  try {
    await db.execute(
      'UPDATE Payments SET task_id = ?, amount = ?, payment_status = ? WHERE payment_id = ?',
      [task_id, amount, payment_status, req.params.id]
    );
    res.json({ message: 'Payment updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a payment
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM Payments WHERE payment_id = ?', [req.params.id]);
    res.json({ message: 'Payment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
