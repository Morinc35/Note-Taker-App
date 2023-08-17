const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();
const dbFilePath = path.join(__dirname, '../db/db.json');

async function readNotesFile() {
  try {
    const notes = await fs.readFile(dbFilePath, 'utf8');
    return JSON.parse(notes);
  } catch (error) {
    throw new Error("Failed to read notes.");
  }
}

async function writeNotesFile(jsonNotes) {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(jsonNotes, null, 2));
  } catch (error) {
    throw new Error("Failed to save note.");
  }
}

router.get('/notes', async (req, res) => {
  try {
    const notes = await readNotesFile();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/notes', async (req, res) => {
  try {
    const notes = await readNotesFile();
    const newNote = { ...req.body, id: Date.now().toString() };
    notes.push(newNote);
    await writeNotesFile(notes);
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/notes/:id', async (req, res) => {
  try {
    let notes = await readNotesFile();
    notes = notes.filter(note => note.id !== req.params.id);
    await writeNotesFile(notes);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;