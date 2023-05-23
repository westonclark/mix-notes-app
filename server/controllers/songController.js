const express = require('express');
const db = require('../models/databaseModel.js');
const AWS = require('aws-sdk');
require('dotenv').config();

// Middleware Error Generator Function
const createErr = (errInfo) => {
  const { location, type, err } = errInfo;
  return {
    log: `songController.${location} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err },
  };
};

const songController = {
  async uploadSongAudio(req, res, next) {
    const { name, project_name, email } = req.body;
    const awsName = `${email}/${project_name}/${name}`;
    const s3 = new AWS.S3({ accessKeyId: process.env.accessKey, secretAccessKey: process.env.secretAcessKey });

    const uploadToS3 = (filename, bucketname, file) => {
      return new Promise((resolve, reject) => {
        const params = {
          Key: filename,
          Bucket: bucketname,
          Body: file,
          ACL: 'public-read',
        };

        s3.upload(params, (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    };

    const { Location } = await uploadToS3(awsName, 'mixnotesbucket', req.file.buffer);
    res.locals.url = Location;
    return next();
  },

  async storeSongData(req, res, next) {
    try {
      const { name, project_id } = req.body;
      const { url } = res.locals;
      if (name == undefined || project_id == undefined) {
        return next(
          createErr({
            location: 'storeSongData',
            type: 'request body',
            err: 'missing required fields',
          })
        );
      }
      const { rows } = await db.query(`INSERT INTO songs (name, url, project_id, complete) VALUES ('${name}','${url}',${project_id},false) RETURNING name, url, project_id, complete`);
      res.locals.songInfo = rows[0];
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

  async getSongs(req, res, next) {
    try {
      const { project_id } = req.params;
      if (project_id == undefined) {
        return next(
          createErr({
            location: 'getSongs',
            type: 'request parameters',
            err: 'missing required fields',
          })
        );
      }

      const { rows } = await db.query(`SELECT * from songs WHERE project_id = '${project_id}'`);
      res.locals.songList = rows;
      return next();
    } catch (err) {
      return next(
        createErr({
          location: 'getSongs',
          type: 'reading from db',
          err,
        })
      );
    }
  },
};

module.exports = songController;
