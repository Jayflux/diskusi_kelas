const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// GET user by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }
        res.send(results[0]);
    });
});

// POST - Register user
router.post('/', (req, res) => {
    const { username, email, role } = req.body;
    const sql = 'INSERT INTO users (username, email, role) VALUES (?, ?, ?)';
    db.query(sql, [username, email, role], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Pengguna berhasil didaftarkan' });
    });
});

// PUT - Update user
router.put('/:id', (req, res) => {
    const { username, email, role } = req.body;
    const sql = 'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?';
    db.query(sql, [username, email, role, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Pengguna berhasil diperbarui' });
    });
});

// DELETE user
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Pengguna berhasil dihapus' });
    });
});

module.exports = router;
