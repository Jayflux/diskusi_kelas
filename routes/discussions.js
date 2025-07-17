const express = require('express');
const router = express.Router();
const db = require('../db');

// Buat topik diskusi
router.post('/', (req, res) => {
    const { title, content, user_id } = req.body;
    const sql = 'INSERT INTO discussions (title, content, user_id, created_at) VALUES (?, ?, ?, NOW())';
    db.query(sql, [title, content, user_id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Topik diskusi berhasil dibuat' });
    });
});

// Ambil semua diskusi
router.get('/', (req, res) => {
    const sql = `SELECT d.id, d.title, d.content, d.created_at, u.username 
               FROM discussions d JOIN users u ON d.user_id = u.id 
               ORDER BY d.created_at DESC`;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

module.exports = router;
