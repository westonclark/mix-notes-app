const express = require('express');
const db = require('../models/databaseModel.js');
const AWS = require('aws-sdk');
require('dotenv').config();

// Middleware Error Generator Function
const createErr = (errInfo) => {
  const { location, type, err } = errInfo;
  return {
    log: `songController.${location} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Missing required fields.` },
  };
};

const songController = {
  async uploadSongAudio(req, res, next) {
    const { name } = req.body;

    const s3 = new AWS.S3({ accessKeyId: process.env.accessKey, secretAccessKey: process.env.secretAcessKey });

    const uploadToS3 = (filename, bucketname, file) => {
      return new Promise((resolve, reject) => {
        const params = {
          Key: filename,
          Bucket: bucketname,
          Body: file,
          // ContentType: 'audio',
          ACL: 'public-read',
        };

        s3.upload(params, (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    };

    const { Location } = await uploadToS3(name, 'mixnotesbucket', req.file.buffer);
    res.locals.url = Location;
    return next();
  },

  storeSongData(req, res, next) {
    try {
      const { name, project } = req.body;
      const { url } = res.locals;
      if (name == undefined || project == undefined) {
        return next(
          createErr({
            location: 'storeSongData',
            type: 'request body',
            err: 'missing required fields',
          })
        );
      }
      db.query(`INSERT INTO songs (name, url, project, complete) VALUES ('${name}','${url}','${project}','false')`);
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
};

module.exports = songController;
