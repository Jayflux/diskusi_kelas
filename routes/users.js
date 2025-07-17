const express = require('express');
const router = express.Router();
const db = require('../db');

// Daftar pengguna baru
router.post('/register', (req, res) => {
    const { username, email, role } = req.body;
    const sql = 'INSERT INTO users (username, email, role) VALUES (?, ?, ?)';
    db.query(sql, [username, email, role], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Pengguna berhasil didaftarkan' });
    });
});

module.exports = router;
