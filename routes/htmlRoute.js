const express = require('express');
const path = require('path');
const routes = express.Router();

// Created a function to serve the HTML path
function serveHTML(res, fileName) {
  const filePath = path.join(__dirname, `../public/${fileName}.html`);
  res.sendFile(filePath);
}

// "/notes" responds with the notes.html file
routes.get('/notes', (req, res) => {
  serveHTML(res, 'notes');
});

// All other routes respond with the index.html file
routes.get('*', (req, res) => {
  serveHTML(res, 'index');
});

module.exports = routes;