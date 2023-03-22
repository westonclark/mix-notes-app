const express = require('express');
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
    cb(null, './uploads');
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.get('/files', (req, res) => {
  console.log('recieved a request for files');
  const files = fs.readdirSync('./uploads');
  return res.status(200).json(files);
});

app.post('/addfile', upload.any('name'), (req, res) => {
  return res.sendStatus(200);
});

app.listen(3000);
