const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect();

app.get('/');

app.post('/addfile');

app.listen(3000);
