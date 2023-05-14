const express = require('express');
const app = express();
const path = require('path');
let fs = require('fs');
const PORT = 3000;

const { storeSongData, uploadSongAudio } = require('./controllers/songController.js');
const { storeUserData } = require('./controllers/userController.js');
const { createProject } = require('./controllers/projectController.js');
const { createNote } = require('./controllers/notesController.js');

const multer = require('multer');
const { memoryStorage } = require('multer');
const storage = memoryStorage();
const upload = multer({ storage });

const cors = require('cors');
app.use(cors());
app.use(express.json());

// POST
////////////////////////////////////////////////////////////
app.post('/users', storeUserData, (req, res) => {
  return res.json(res.locals.userInfo);
});

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
app.get('/projects/:user_id', (req, res) => {
  return res.json(res.locals.songs);
});

app.get('/songs/:project_id', (req, res) => {
  return res.json(res.locals.songs);
});

app.get('/notes/:song_id', (req, res) => {
  return res.json(res.locals.notes);
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
