// Module Imports
const path = require('path');
let fs = require('fs');

// Server Initialization
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware Imports
const { storeUserData, verifyUser } = require('./controllers/userController.js');
const { createProject, getProjects } = require('./controllers/projectController.js');
const { storeSongData, uploadSongAudio, getSongs } = require('./controllers/songController.js');
const { createNote, getNotes, updateNote, deleteNote } = require('./controllers/notesController.js');

// Initialize Temporary Local Memory Storage
const multer = require('multer');
const { memoryStorage } = require('multer');
const storage = memoryStorage();
const upload = multer({ storage });

// Global Middleware
// const cors = require('cors');
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname, '../src/index.html');
});

// Login / Signup
////////////////////////////////////////////////////////////
app.post('/login', verifyUser, (req, res) => {
  return res.json(res.locals);
});

app.post('/signup', storeUserData, (req, res) => {
  return res.json(res.locals);
});

// POST
////////////////////////////////////////////////////////////
app.post('/projects', createProject, (req, res) => {
  return res.json(res.locals.projectInfo);
});

app.post('/songs', upload.single('audiofile'), uploadSongAudio, storeSongData, (req, res) => {
  return res.json(res.locals.songInfo);
});

app.post('/notes', createNote, (req, res) => {
  return res.json(res.locals.noteInfo);
});

// GET
////////////////////////////////////////////////////////////
app.get('/projects/:user_id', getProjects, (req, res) => {
  return res.json(res.locals.projectList);
});

app.get('/songs/:project_id', getSongs, (req, res) => {
  return res.json(res.locals.songList);
});

app.get('/notes/:song_id', getNotes, (req, res) => {
  return res.json(res.locals.noteList);
});

// PATCH
////////////////////////////////////////////////////////////
app.patch('/notes/:note_id', updateNote, (req, res) => {
  return res.sendStatus(200);
});

// DELETE
////////////////////////////////////////////////////////////
app.delete('/projects/:project_id', (req, res) => {
  return res.sendStatus(200);
});

app.delete('/songs/:song_id', (req, res) => {
  return res.sendStatus(200);
});

app.delete('/notes/:note_id', deleteNote, (req, res) => {
  return res.sendStatus(200);
});

// Global Unkown Error Catch
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message.err);
});

app.listen(PORT);
