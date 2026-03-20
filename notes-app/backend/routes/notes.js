const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes + search
router.get('/', async (req, res) => {
  try {
    const { q, tag } = req.query;
    let query = {};

    if (q && q.trim()) {
      const regex = new RegExp(q.trim(), 'i');
      query.title = { $regex: regex };
    }

    if (tag) {
      query.tags = tag;
    }

    const notes = await Note.find(query)
      .sort({ pinned: -1, updatedAt: -1 })
      .lean();

    res.json({ notes, searchTerm: q || '' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single note
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE note
router.post('/', async (req, res) => {
  try {
    const { title, content, tags, color, pinned } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const note = await Note.create({ title, content, tags, color, pinned });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE note
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
