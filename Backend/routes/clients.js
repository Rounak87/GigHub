// routes/clients.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Create new client
router.post('/', async (req, res) => {
  const { name, company, contact } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO Clients (name, company, contact) VALUES (?, ?, ?)',
      [name, company, contact]
    );
    res.status(201).json({ message: 'Client registered', clientId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all clients
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Clients');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get client by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Clients WHERE client_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Client not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update client
router.put('/:id', async (req, res) => {
  const { name, company, contact } = req.body;
  try {
    await db.execute(
      'UPDATE Clients SET name = ?, company = ?, contact = ? WHERE client_id = ?',
      [name, company, contact, req.params.id]
    );
    res.json({ message: 'Client updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete client
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM Clients WHERE client_id = ?', [req.params.id]);
    res.json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
