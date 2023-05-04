const express = require('express');
const db = require('../models/databaseModel.js');
const AWS = require('aws-sdk');
require('dotenv').config();

// Error Creator
const createErr = (errInfo) => {
  const { location, type, err } = errInfo;
  return {
    log: `songController.${location} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in songController.${location}. Check server logs for more details.` },
  };
};

const songController = {
  storeSongData(req, res, next) {
    try {
      const { song_name, song_url } = req.body;
      if (song_name == undefined || song_url == undefined) {
        return next(
          createErr({
            location: 'storeSongData',
            type: 'request body',
            err: 'missing required fields',
          })
        );
      }
      db.query(`INSERT INTO songs (song_name, song_url, song_complete) VALUES ('${song_name}','${song_url}','false')`);
      return next();
    } catch (err) {
      return next(
        createErr({
          location: 'storeSongData',
          type: 'writing to db',
          err,
        })
      );
    }
  },

  async uploadSongAudio(req, res, next) {
    const s3 = new AWS.S3({ accessKeyId: process.env.accessKey, secretAccessKey: process.env.secretAcessKey });

    const uploadToS3 = (filename, bucketname, file) => {
      return new Promise((resolve, reject) => {
        const params = {
          Key: filename,
          Bucket: bucketname,
          Body: file,
          ContentType: ';audio/mp3',
          ACL: 'public-read',
        };

        s3.upload(params, (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    };

    const filename = 'dad2';
    const bucketname = 'mixnotesbucket';
    const file = req.file.buffer;
    const link = await uploadToS3(filename, bucketname, file);
    console.log(link);
  },
};

module.exports = songController;
