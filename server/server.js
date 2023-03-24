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
    cb(null, './server/uploads');
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(cors());

// if (process.env.NODE_ENV == 'production') {
//   // statically serve everything in the build folder on the route '/build'
//   app.use('/build', express.static(path.join(__dirname, '../build')));
//   // serve index.html on the route '/'
//   app.get('/', (req, res) => {
//     return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
//   });
// }

app.get('/files', (req, res) => {
  const files = fs.readdirSync('./server/uploads');
  return res.status(200).json(files);
});

app.get('/uploads/:id', (req, res) => {
  return res.sendFile(path.join(__dirname + '/uploads/' + req.params.id));
});

// app.get('/notes', (req, res) => {
//   return res.sendStatus(200);
// });

app.post('/addfile', upload.any('name'), (req, res) => {
  return res.sendStatus(200);
});

// app.post('/notes', (req, res) => {
//   return res.sendStatus(200);
// });

app.listen(3000);
