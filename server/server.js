const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
let fs = require('fs');
const cors = require('cors');

const multer = require('multer');
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  destination: function (req, file, cb) {
    cb(null, './server/uploads');
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.get('/files', (req, res) => {
  const files = fs.readdirSync('./server/uploads');
  return res.status(200).json(files);
});

app.get('/uploads/:id', (req, res) => {
  return res.sendFile(path.join(__dirname + '/uploads/' + req.params.id));
});

app.post('/addfile', upload.any('name'), (req, res) => {
  return res.sendStatus(200);
});

app.listen(3000);
