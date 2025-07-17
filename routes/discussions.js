const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all discussions
router.get('/', (req, res) => {
    const sql = `
        SELECT d.id, d.title, d.content, d.created_at, u.username 
        FROM discussions d
        JOIN users u ON d.user_id = u.id
        ORDER BY d.created_at DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// POST discussion
router.post('/', (req, res) => {
    const { title, content, user_id } = req.body;
    const sql = 'INSERT INTO discussions (title, content, user_id, created_at) VALUES (?, ?, ?, NOW())';
    db.query(sql, [title, content, user_id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Topik diskusi berhasil dibuat' });
    });
});

// PUT update discussion
router.put('/:id', (req, res) => {
    const { title, content } = req.body;
    const sql = 'UPDATE discussions SET title = ?, content = ? WHERE id = ?';
    db.query(sql, [title, content, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Diskusi berhasil diperbarui' });
    });
});

// DELETE discussion
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM discussions WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Diskusi berhasil dihapus' });
    });
});

module.exports = router;
