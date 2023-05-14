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

//OLD

// const multer = require('multer');
// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
//   destination: function (req, file, cb) {
//     cb(null, './server/uploads');
//   },
// });
// const upload = multer({ storage });

// app.post('/songs', upload.any('name'), (req, res) => {
//   return res.sendStatus(200);
// });

// app.get('/songs', (req, res) => {
//   return res.sendStatus(200);
// });

// app.get('/uploads/:id', (req, res) => {
//   return res.sendFile(path.join(__dirname + '/uploads/' + req.params.id));
// });

// app.get('/songs', (req, res) => {
//   const files = fs.readdirSync('./server/uploads');
//   return res.status(200).json(files);
// });

// NEW
app.post('/songs', upload.single('audiofile'), uploadSongAudio, storeSongData, (req, res) => {
  return res.json(res.locals.songInfo);
});

app.post('/users', storeUserData, (req, res) => {
  return res.json(res.locals.userInfo);
});

app.post('/projects', createProject, (req, res) => {
  return res.json(res.locals.projectInfo);
});

app.post('/notes', createNote, (req, res) => {
  return res.json(res.locals.noteInfo);
});

// app.get('/songs', (req, res) => {
//   return res.sendStatus(200);
// });

// app.get('/projects', (req, res) => {
//   return res.sendStatus(200);
// });

// app.post('/projects', (req, res) => {
//   return res.sendStatus(200);
// });

// app.post('/notes', (req, res) => {
//   return res.sendStatus(200);
// });

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
