const express = require('express');
const db = require('../models/databaseModel.js');

// Middleware Error Generator Function
const createErr = (errInfo) => {
  const { location, type, err } = errInfo;
  return {
    log: `noteController.${location} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Missing required fields.` },
  };
};

const notesController = {
  async createNote(req, res, next) {
    try {
      // id | content | complete | song(foreign key)

      const { content, complete, song_id } = req.body;
      if (content == undefined || complete == undefined || song_id == undefined) {
        return next(
          createErr({
            location: 'createNote',
            type: 'request body',
            err: 'missing required fields',
          })
        );
      }

      const { rows } = await db.query(`INSERT INTO notes (content, complete, song_id) VALUES ('${content}','${complete}','${song_id}') RETURNING content, complete, song_id`);
      res.locals.noteInfo = rows[0];

      return next();
    } catch (err) {
      return next(
        createErr({
          location: 'createNote',
          type: 'writing to db',
          err,
        })
      );
    }
  },
  async getNotes(req, res, next) {
    try {
      const { song_id } = req.params;
      if (song_id == undefined) {
        return next(
          createErr({
            location: 'getNotes',
            type: 'request body',
            err: 'missing required fields',
          })
        );
      }

      const { rows } = await db.query(`SELECT * from notes WHERE song_id = '${song_id}'`);
      res.locals.noteList = rows;
      return next();
    } catch (err) {
      return next(
        createErr({
          location: 'getNotes',
          type: 'reading from db',
          err,
        })
      );
    }
  },
};

module.exports = notesController;
