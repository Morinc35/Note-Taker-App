const express = require('express');
const routes = express.Router();
const store = require('../db/store');

// GET request responds with all notes 
routes.get('/notes', async (req, res) => {
  try {
    const notes = await store.getNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST request adds a new note to the database
routes.post('/notes', async (req, res) => {
  try {
    const note = await store.addNote(req.body);
    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE request deletes the note with the id
routes.delete('/notes/:id', async (req, res) => {
  try {
    await store.removeNote(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = routes;