const express = require('express');
const router = express.Router();
const db = require('../db');

// Tambah komentar
router.post('/', (req, res) => {
    const { discussion_id, user_id, comment } = req.body;
    const sql = 'INSERT INTO comments (discussion_id, user_id, comment, created_at) VALUES (?, ?, ?, NOW())';
    db.query(sql, [discussion_id, user_id, comment], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Komentar berhasil ditambahkan' });
    });
});

// Ambil komentar dari diskusi tertentu
router.get('/:discussionId', (req, res) => {
    const sql = `SELECT c.id, c.comment, c.created_at, u.username 
               FROM comments c JOIN users u ON c.user_id = u.id 
               WHERE c.discussion_id = ? ORDER BY c.created_at ASC`;
    db.query(sql, [req.params.discussionId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

module.exports = router;
