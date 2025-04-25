const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a donor
router.post('/', (req, res) => {
  const { name, blood_type, contact_number, last_donation } = req.body;
  const query = 'INSERT INTO donors (name, blood_type, contact_number, last_donation) VALUES (?, ?, ?, ?)';
  db.execute(query, [name, blood_type, contact_number, last_donation], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Donor added', donorId: result.insertId });
  });
});

// Get all donors
router.get('/', (req, res) => {
  db.execute('SELECT * FROM donors', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a single donor by ID
router.get('/:id', (req, res) => {
  const donorId = req.params.id;
  db.execute('SELECT * FROM donors WHERE id = ?', [donorId], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (results.length === 0) return res.status(404).json({ message: 'Donor not found' });
    res.json(results[0]);
  });
});

// Update a donor
router.put('/:id', (req, res) => {
  const donorId = req.params.id;
  const { name, blood_type, contact_number, last_donation } = req.body;
  const query = 'UPDATE donors SET name=?, blood_type=?, contact_number=?, last_donation=? WHERE id=?';
  db.execute(query, [name, blood_type, contact_number, last_donation, donorId], (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Donor updated successfully' });
  });
});

// Delete a donor
router.delete('/:id', (req, res) => {
  const donorId = req.params.id;
  db.execute('DELETE FROM donors WHERE id = ?', [donorId], (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Donor not found' });
    res.json({ message: 'Donor deleted successfully' });
  });
});

module.exports = router;

const donorRoutes = require('./routes/donors');
app.use('/donors', donorRoutes);
